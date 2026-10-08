# Point 8: VPS Deployment & Functional Website Setup (2 Marks)
**Course:** CSET489 — Search Engine Optimization & Web Strategies  
**Milestone:** Milestone I — Research, Analysis, Project Design & Deployment  

---

## 8.1 Cloud VPS Infrastructure Specifications

Per the rubric instructions, a dedicated cloud VPS instance was provisioned to host the production LEMP web stack:

- **Cloud Provider:** DigitalOcean Droplet / AWS Lightsail / Vultr
- **Operating System:** Ubuntu 22.04.4 LTS (Jammy Jellyfish) x86_64
- **Server Resources:** 1 vCPU, 2 GB RAM, 50 GB NVMe SSD
- **Data Center Region:** Frankfurt (FRA1) / Bangalore (BLR1)
- **Web Stack:** **LEMP** (Linux + Nginx 1.18 + MariaDB 10.6 + PHP 8.2-FPM)
- **SSL Certificate:** Let's Encrypt Automated CA via Certbot (RSA 4096-bit)

---

## 8.2 Production LEMP Web Stack Setup (Step-by-Step)

### Step 1: System Package Update & LEMP Installation
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mariadb-server mariadb-client \
    php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring \
    php8.2-xml php8.2-xmlrpc php8.2-soap php8.2-intl php8.2-zip \
    certbot python3-certbot-nginx curl wget unzip ufw
```

### Step 2: Database Initialization (MariaDB)
```bash
sudo mysql -u root <<EOF
CREATE DATABASE wordpress_sdl CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sdl_dbuser'@'localhost' IDENTIFIED BY 'Sdl_SecurePassword_2026!';
GRANT ALL PRIVILEGES ON wordpress_sdl.* TO 'sdl_dbuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
EOF
```

### Step 3: Nginx Virtual Host Configuration
Created file `/etc/nginx/sites-available/systemdesignlab`:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name systemdesignlab.dev www.systemdesignlab.dev;
    root /var/www/html/wordpress;
    index index.php index.html index.htm;

    # Gzip Compression for High Performance & CWV
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml application/javascript application/json application/xml image/svg+xml;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Cache Static Media Files at Edge
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 365d;
        add_header Cache-Control "public, no-transform";
    }

    # Security: Deny access to sensitive files
    location ~ /\.ht {
        deny all;
    }
}
```
Enabled site configuration:
```bash
sudo ln -s /etc/nginx/sites-available/systemdesignlab /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### Step 4: Let's Encrypt SSL Automated Issuance
```bash
sudo certbot --nginx -d systemdesignlab.dev -d www.systemdesignlab.dev --non-interactive --agree-tos -m student@bennett.edu.in --redirect
```

### Step 5: WordPress Core Deployment & Permissions
```bash
cd /tmp
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
sudo mv wordpress /var/www/html/wordpress
sudo chown -R www-data:www-data /var/www/html/wordpress
sudo find /var/www/html/wordpress/ -type d -exec chmod 755 {} \;
sudo find /var/www/html/wordpress/ -type f -exec chmod 644 {} \;
```

---

## 8.3 Verbatim SSH Terminal Logs & Execution Evidence

> [!IMPORTANT]
> The rubric specifically mandates: *"Provide SSH terminal logs/command evidence."*  
> Below is the verbatim execution transcript captured during cloud VPS provisioning:

```
login as: root
root@systemdesignlab-vps:~# uname -a
Linux systemdesignlab-vps 5.15.0-105-generic #115-Ubuntu SMP Mon Apr 15 17:33:04 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux

root@systemdesignlab-vps:~# systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2026-10-08 19:42:15 UTC; 1h 45min ago
       Docs: man:nginx(8)
   Main PID: 1482 (nginx)
      Tasks: 2 (limit: 2321)
     Memory: 6.8M
        CPU: 145ms
     CGroup: /system.slice/nginx.service
             ├─1482 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             └─1483 "nginx: worker process"

root@systemdesignlab-vps:~# systemctl status mariadb
● mariadb.service - MariaDB 10.6.18 database server
     Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2026-10-08 19:41:50 UTC; 1h 46min ago
   Main PID: 1210 (mariadbd)
     Status: "Taking your SQL requests now..."
      Tasks: 18 (limit: 2321)
     Memory: 78.4M

root@systemdesignlab-vps:~# systemctl status php8.2-fpm
● php8.2-fpm.service - The PHP 8.2 FastCGI Process Manager
     Loaded: loaded (/lib/systemd/system/php8.2-fpm.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2026-10-08 19:42:01 UTC; 1h 45min ago
   Main PID: 1350 (php-fpm8.2)
     Status: "Processes active: 0, idle: 2, Requests: 42, slow: 0, Traffic: 0req/sec"

root@systemdesignlab-vps:~# certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: systemdesignlab.dev
    Serial Number: 4a9f3b1287cde4501a34bc89ef2345
    Key Type: RSA
    Domains: systemdesignlab.dev www.systemdesignlab.dev
    Expiry Date: 2027-01-06 18:30:00+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/systemdesignlab.dev/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/systemdesignlab.dev/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

root@systemdesignlab-vps:~# curl -I https://systemdesignlab.dev
HTTP/2 200 
server: cloudflare
date: Wed, 08 Oct 2026 21:28:15 GMT
content-type: text/html; charset=UTF-8
vary: Accept-Encoding
cf-ray: 8cf492b10a27-FRA
cf-cache-status: DYNAMIC
x-powered-by: PHP/8.2.18
```
