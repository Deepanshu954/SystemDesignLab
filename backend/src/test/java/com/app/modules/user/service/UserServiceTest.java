package com.app.modules.user.service;

import com.app.common.exception.BadRequestException;
import com.app.common.security.JwtTokenProvider;
import com.app.modules.user.dto.AuthResponse;
import com.app.modules.user.dto.LoginRequest;
import com.app.modules.user.dto.RegisterRequest;
import com.app.modules.user.entity.User;
import com.app.modules.user.entity.UserRole;
import com.app.modules.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private JwtTokenProvider tokenProvider;
    private UserService userService;

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider(
                "c3lzdGVtLWRlc2lnbi1sYWItc3VwZXItc2VjcmV0LWtleS1mb3Itand0LWF1dGhlbnRpY2F0aW9uLXByb2R1Y3Rpb24tbXVzdC1iZS02NC1ieXRlcy1sb25n",
                900000,
                604800000
        );
        userService = new UserService(userRepository, passwordEncoder, tokenProvider);
    }

    @Test
    void register_Success() {
        RegisterRequest request = new RegisterRequest("test@test.com", "Password123!", "Test User");

        when(userRepository.existsByEmailIgnoreCase(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed-pwd");

        User savedUser = new User("test@test.com", "hashed-pwd", "Test User", UserRole.ROLE_STUDENT);
        savedUser.setId(UUID.randomUUID());

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        AuthResponse response = userService.register(request);

        assertThat(response).isNotNull();
        assertThat(response.accessToken()).isNotEmpty();
        assertThat(response.user().email()).isEqualTo("test@test.com");
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_DuplicateEmail_ThrowsBadRequestException() {
        RegisterRequest request = new RegisterRequest("existing@test.com", "Password123!", "Test User");
        when(userRepository.existsByEmailIgnoreCase("existing@test.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.register(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("already exists");
    }

    @Test
    void login_Success() {
        LoginRequest request = new LoginRequest("test@test.com", "Password123!");
        User user = new User("test@test.com", "hashed-pwd", "Test User", UserRole.ROLE_STUDENT);
        user.setId(UUID.randomUUID());

        when(userRepository.findByEmailIgnoreCase("test@test.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Password123!", "hashed-pwd")).thenReturn(true);

        AuthResponse response = userService.login(request);

        assertThat(response).isNotNull();
        assertThat(response.accessToken()).isNotEmpty();
    }

    @Test
    void login_WrongPassword_ThrowsBadCredentialsException() {
        LoginRequest request = new LoginRequest("test@test.com", "WrongPassword");
        User user = new User("test@test.com", "hashed-pwd", "Test User", UserRole.ROLE_STUDENT);

        when(userRepository.findByEmailIgnoreCase("test@test.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("WrongPassword", "hashed-pwd")).thenReturn(false);

        assertThatThrownBy(() -> userService.login(request))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessageContaining("Invalid email or password");
    }
}
