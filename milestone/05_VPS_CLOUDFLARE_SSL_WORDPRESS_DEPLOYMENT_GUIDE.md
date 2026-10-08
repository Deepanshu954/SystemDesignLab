# Section 5: VPS Setup, Cloudflare DNS, SSL & Functional WordPress Deployment (4 Marks)
**Course:** CSET489 — Search Engine Optimization & Web Strategies  
**Module:** Milestone I — Cloud Infrastructure & Deployment  

---

## 5.1 Architecture Overview

To fulfill the university's technical infrastructure mandate, we configure a hardened cloud hosting stack with edge DNS routing and automated disaster recovery:

```
+--------------------------------------------------------------------------------+
| USER (Googlebot / Visitor)                                                    |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| CLOUDFLARE EDGE CDN & DNS (Proxied Mode)                                       |
| - Free Universal SSL/TLS Encryption                                            |
| - Edge Caching & Brotli Compression                                            |
| - Web Application Firewall (WAF) & DDoS Mitigation                             |
| - HTTP/3 + HTTP/2 Support                                                      |
+--------------------------------------------------------------------------------+
                                       |
                                       v
+--------------------------------------------------------------------------------+
| CLOUD VPS (Linux / Ubuntu 22.04 LTS or Docker Host)                           |
| - Nginx / Apache Web Server with Gzip/Brotli                                   |
| - PHP 8.2 / 8.3-FPM Runtime                                                    |
| - MySQL 8.0 / MariaDB Database Cluster                                         |
| - WordPress Core (System Design Lab Content Hub)                              |
| - UpdraftPlus Disaster Recovery Engine (Automated Cloud Sync)                  |
+--------------------------------------------------------------------------------+
```

---

## 5.2 Step-by-Step VPS Provisioning (Options)

You can use any of the following VPS or cloud hosting options:

### Option A: Free Tier Cloud VPS (100% Free Forever)
- **Oracle Cloud Infrastructure (OCI):** Always-Free Ampere A1 Compute Instance (4 OCPUs, 24 GB RAM, 200 GB Storage).
- **AWS Free Tier:** EC2 `t2.micro` or `t3.micro` instance (Ubuntu 22.04 LTS, 1 GB RAM).
- **Google Cloud Platform (GCP):** `e2-micro` Always-Free compute instance.

### Option B: Quick Docker WordPress (Local/VPS)
If you already have a Linux VPS or want to run WordPress via Docker in 2 minutes:
```bash
# 1. Create a dedicated directory
mkdir -p /opt/wordpress-hub && cd /opt/wordpress-hub

# 2. Run WordPress + MySQL container stack
cat <<EOF > docker-compose.yml
version: '3.8'
services:
  db:
    image: mariadb:10.11
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: sdl_secure_root_2026
      MYSQL_DATABASE: wordpress_sdl
      MYSQL_USER: wp_user
      MYSQL_PASSWORD: wp_password_2026
    volumes:
      - db_data:/var/lib/mysql

  wordpress:
    image: wordpress:latest
    restart: always
    ports:
      - "80:80"
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wp_user
      WORDPRESS_DB_PASSWORD: wp_password_2026
      WORDPRESS_DB_NAME: wordpress_sdl
    volumes:
      - wp_data:/var/www/html

volumes:
  db_data:
  wp_data:
EOF

docker compose up -d
```

---

## 5.3 Cloudflare DNS & SSL Configuration (Step-by-Step)

The university rubric specifically checks **Cloudflare DNS + SSL**. Here is the exact setup procedure:

### 1. Add Domain to Cloudflare
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and create a free account.
2. Click **"Add a Domain"** and enter your domain name (e.g., `systemdesignlab.dev` or your personal custom domain).
3. Select the **Free Plan** ($0/month).

### 2. Update Nameservers at Domain Registrar
1. Cloudflare will scan existing records and provide two authoritative nameservers:
   - `ns1.cloudflare.com` (Example: `cloe.ns.cloudflare.com`)
   - `ns2.cloudflare.com` (Example: `skip.ns.cloudflare.com`)
2. Go to your Domain Registrar (Namecheap, GoDaddy, Hostinger, Porkbun).
3. Under **Nameserver Settings**, select **Custom DNS** and paste Cloudflare's two nameservers.
4. Wait 5–15 minutes for propagation.

### 3. Configure DNS Records in Cloudflare
Under Cloudflare Dashboard ➔ **DNS ➔ Records**, add:
- **Record 1 (Root Domain):**
  - Type: `A`
  - Name: `@` (or domain name)
  - IPv4 Address: `YOUR_VPS_PUBLIC_IP` (e.g., `144.24.12.89`)
  - Proxy Status: **Proxied (Orange Cloud Icon)** ✅
  - TTL: Auto
- **Record 2 (WWW Subdomain):**
  - Type: `CNAME`
  - Name: `www`
  - Target: `@`
  - Proxy Status: **Proxied (Orange Cloud Icon)** ✅

### 4. Enable SSL/TLS Encryption
Under Cloudflare Dashboard ➔ **SSL/TLS ➔ Overview**:
1. Select Encryption Mode: **"Full"** (or **"Full (Strict)"** if Origin Certificate installed, or **"Flexible"** if HTTP on origin).
2. Go to **SSL/TLS ➔ Edge Certificates**:
   - Toggle **"Always Use HTTPS"** ➔ **ON** (Redirects all HTTP to HTTPS).
   - Toggle **"Automatic HTTPS Rewrites"** ➔ **ON** (Prevents mixed content warnings).
   - Minimum TLS Version: **TLS 1.2**.
   - Opportunistic Encryption: **ON**.

### 5. Speed & Caching Optimizations
Under Cloudflare Dashboard ➔ **Speed ➔ Optimization**:
- Enable **Brotli Compression** (20% smaller payload than Gzip).
- Enable **Early Hints** (Speeds up browser resource preloading).
- Cache Level: Standard.

---

## 5.4 Functional WordPress Deployment & SEO Configuration

Once your domain resolves through Cloudflare with the green SSL padlock:

1. **Complete WordPress 5-Minute Install:**
   - Site Title: `System Design Lab — Architecture & Interview Hub`
   - Admin Username: `admin_sdl` (Avoid generic `admin` for security)
   - Password: Generate strong password.
   - Admin Email: Your university email.
2. **Crucial SEO Permalink Structure (Mandatory):**
   - In WP Admin, navigate to **Settings ➔ Permalinks**.
   - Change common settings from `Plain` to **"Post name"** (`/%postname%/`).
   - Click **Save Changes**. *(Clean, keyword-rich URLs without query strings).*
3. **Install Essential SEO Plugins:**
   - **Yoast SEO** or **Rank Math SEO:** Enables automatic XML sitemaps, OpenGraph meta, and schema graphs.
   - **LiteSpeed Cache** or **WP Super Cache:** Enables page caching.

---

## 5.5 UpdraftPlus Backup Procedure & Google Drive Export (Rubric Mandate)

> [!IMPORTANT]
> The evaluation rubric assigns critical marks to:  
> **"functional UpdraftPlus backup link (.zip) shared with public access"**.  
> Follow these steps carefully:

### Step 1: Install UpdraftPlus Plugin
1. In your WordPress Admin Dashboard, go to **Plugins ➔ Add New**.
2. Search for **"UpdraftPlus"**.
3. Click **Install Now** on *UpdraftPlus WordPress Backup Plugin* (3+ million active installs).
4. Click **Activate**.

### Step 2: Generate Full System Backup
1. Go to **Settings ➔ UpdraftPlus Backups**.
2. Click the big blue **"Backup Now"** button.
3. In the pop-up modal, verify that BOTH checkboxes are checked:
   - ✅ *Include your database in the backup*
   - ✅ *Include your files in the backup (Plugins, Themes, Uploads, Others)*
4. Click **"Backup Now"**.
5. Wait 1–3 minutes while UpdraftPlus packages your database and files.

### Step 3: Download the Backup Files
1. Scroll down to **"Existing backups"**.
2. You will see 5 blue download buttons:
   - `Database`
   - `Plugins`
   - `Themes`
   - `Uploads`
   - `Others`
3. Click on each button and click **"Download to your computer"**.
4. Group them into a single clean zip file named:  
   `SystemDesignLab_UpdraftPlus_FullBackup.zip`.

### Step 4: Upload to Google Drive & Create Public Share Link
1. Open [Google Drive](https://drive.google.com).
2. Upload `SystemDesignLab_UpdraftPlus_FullBackup.zip`.
3. Right-click the file and click **Share ➔ Share**.
4. Under *General Access*, change from *Restricted* to:  
   **"Anyone with the link"** ➔ Role: **"Viewer"**.
5. Click **"Copy link"**.
6. Paste this link into Section 6 of your final assignment report!
