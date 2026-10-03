package com.app.modules.user.service;

import com.app.common.exception.BadRequestException;
import com.app.common.exception.ResourceNotFoundException;
import com.app.common.security.JwtTokenProvider;
import com.app.modules.user.dto.AuthResponse;
import com.app.modules.user.dto.LoginRequest;
import com.app.modules.user.dto.RegisterRequest;
import com.app.modules.user.dto.UserResponse;
import com.app.modules.user.entity.User;
import com.app.modules.user.entity.UserRole;
import com.app.modules.user.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional(rollbackFor = Exception.class)
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new BadRequestException("An account with this email already exists");
        }

        String hashedPassword = passwordEncoder.encode(request.password());
        User user = new User(request.email().toLowerCase().trim(), hashedPassword, request.fullName().trim(), UserRole.ROLE_STUDENT);
        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateToken(savedUser.getId(), savedUser.getEmail(), savedUser.getRole().name());
        return AuthResponse.of(token, 900, UserResponse.fromEntity(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = tokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole().name());
        return AuthResponse.of(token, 900, UserResponse.fromEntity(user));
    }

    public UserResponse getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return UserResponse.fromEntity(user);
    }
}
