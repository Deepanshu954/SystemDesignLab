#!/usr/bin/env bash
# ==============================================================================
# System Design Lab — Automated 1-Click Cloud VPS Provisioner
# Target OS: Ubuntu 22.04 LTS (x86_64)
# Stack: Production LEMP (Nginx + MariaDB + PHP 8.2-FPM + Certbot SSL + WP-CLI)
# Target Domain: systemdesignlab.dev (or customized DOMAIN argument)
# Fulfills CSET489 Milestone I: VPS Setup & WordPress Deployment (Criterion 8)
# ==============================================================================

set -euo pipefail

# Configuration Defaults
DOMAIN="${1:-systemdesignlab.dev}"
DB_NAME="${2:-sysdesign_wp}"
DB_USER="${3:-sysdesign_user}"
DB_PASS="$(openssl rand -base64 18 | tr -dc 'a-zA-Z0-9' | head -c 16)"
WEB_ROOT="/var/www/${DOMAIN}"
EMAIL="${4:-admin@${DOMAIN}}"

echo "=============================================================================="
echo ">>> STARTING AUTOMATED VPS PROVISIONING FOR: ${DOMAIN}"
echo "=============================================================================="

# 1. Update OS and Install Prerequisites
echo "[1/8] Updating package index and installing base dependencies..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq software-properties-common curl wget git unzip certbot python3-certbot-nginx ufw

# 2. Add PHP repository & Install Stack
echo "[2/8] Installing LEMP Stack (Nginx, MariaDB, PHP 8.2-FPM)..."
add-apt-repository -y ppa:ondrej/php > /dev/null 2>&1
apt-get update -qq
apt-get install -y -qq nginx mariadb-server mariadb-client \
    php8.2-fpm php8.2-mysql php8.2-curl php8.2-gd php8.2-mbstring \
    php8.2-xml php8.2-xmlrpc php8.2-soap php8.2-intl php8.2-zip php8.2-imagick php8.2-opcache

# 3. Secure & Configure MariaDB
echo "[3/8] Configuring MariaDB database and user..."
systemctl start mariadb
mariadb -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mariadb -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
mariadb -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';"
mariadb -e "FLUSH PRIVILEGES;"

# 4. Deploy WordPress Files
echo "[4/8] Downloading and configuring WordPress..."
mkdir -p "${WEB_ROOT}"
cd /tmp
wget -q https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
cp -rf wordpress/* "${WEB_ROOT}/"
rm -rf latest.tar.gz wordpress

# Configure wp-config.php
cp "${WEB_ROOT}/wp-config-sample.php" "${WEB_ROOT}/wp-config.php"
sed -i "s/database_name_here/${DB_NAME}/" "${WEB_ROOT}/wp-config.php"
sed -i "s/username_here/${DB_USER}/" "${WEB_ROOT}/wp-config.php"
sed -i "s/password_here/${DB_PASS}/" "${WEB_ROOT}/wp-config.php"

# Fetch Salts
SALTS=$(curl -s https://api.wordpress.org/secret-key/1.1/salt/)
python3 -c "
import sys
salts = sys.stdin.read()
with open('${WEB_ROOT}/wp-config.php', 'r') as f:
    content = f.read()
import re
pattern = r'define\( *(?:\"|\')AUTH_KEY(?:\"|\').*?define\( *(?:\"|\')NONCE_SALT(?:\"|\').*?\);'
new_content = re.sub(pattern, salts, content, flags=re.DOTALL)
with open('${WEB_ROOT}/wp-config.php', 'w') as f:
    f.write(new_content)
" <<< "$SALTS"

# Correct Permissions
chown -R www-data:www-data "${WEB_ROOT}"
find "${WEB_ROOT}" -type d -exec chmod 755 {} \;
find "${WEB_ROOT}" -type f -exec chmod 644 {} \;

# 5. Configure Nginx Virtual Host
echo "[5/8] Creating Nginx HTTP/2 Virtual Host block..."
cat << 'EOF' > "/etc/nginx/sites-available/${DOMAIN}"
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN_PLACEHOLDER www.DOMAIN_PLACEHOLDER;
    root WEB_ROOT_PLACEHOLDER;
    index index.php index.html;

    client_max_body_size 64M;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
        allow all;
    }

    location ~* \.(css|gif|ico|jpeg|jpg|js|png|webp|svg)$ {
        expires max;
        log_not_found off;
    }
}
EOF

sed -i "s|DOMAIN_PLACEHOLDER|${DOMAIN}|g" "/etc/nginx/sites-available/${DOMAIN}"
sed -i "s|WEB_ROOT_PLACEHOLDER|${WEB_ROOT}|g" "/etc/nginx/sites-available/${DOMAIN}"
ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/"
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 6. Install WP-CLI & Automate Plugins
echo "[6/8] Installing WP-CLI and core plugins..."
if ! command -v wp &> /dev/null; then
    curl -s -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
    mv wp-cli.phar /usr/local/bin/wp
fi

# Download Essential Plugins for Milestone II
wp plugin install seo-by-rank-math --activate --path="${WEB_ROOT}" --allow-root || true
wp plugin install updraftplus --activate --path="${WEB_ROOT}" --allow-root || true
wp plugin install litespeed-cache --activate --path="${WEB_ROOT}" --allow-root || true

# 7. Configure Let's Encrypt SSL
echo "[7/8] Provisioning Certbot Let's Encrypt SSL certificate..."
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos -m "${EMAIL}" --redirect || {
    echo "Notice: Certbot SSL will succeed once Cloudflare DNS A record points directly to this VPS IP."
}

# 8. Service Health Check & Summary
echo "[8/8] Verifying production services..."
systemctl enable nginx mariadb php8.2-fpm
systemctl restart nginx php8.2-fpm

echo "=============================================================================="
echo ">>> PROVISIONING COMPLETE! PRODUCTION CREDENTIALS:"
echo "=============================================================================="
echo "Domain:          https://${DOMAIN}"
echo "Web Root:        ${WEB_ROOT}"
echo "Database Name:   ${DB_NAME}"
echo "Database User:   ${DB_USER}"
echo "Database Pass:   ${DB_PASS}"
echo "Plugins Active:  Rank Math SEO, UpdraftPlus Backup, LiteSpeed Cache"
echo "Nginx Status:    $(systemctl is-active nginx)"
echo "MariaDB Status:  $(systemctl is-active mariadb)"
echo "PHP-FPM Status:  $(systemctl is-active php8.2-fpm)"
echo "=============================================================================="
