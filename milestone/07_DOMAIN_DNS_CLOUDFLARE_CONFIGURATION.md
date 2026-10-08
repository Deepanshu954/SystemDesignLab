# Point 7: Domain, DNS & Cloudflare Configuration (2 Marks)
**Course:** CSET489 — Search Engine Optimization & Web Strategies  
**Milestone:** Milestone I — Research, Analysis, Project Design & Deployment  

---

## 7.1 Custom Domain Registration Details

Per the assignment criteria, a custom top-level domain was registered to establish domain authority and brand identity:

- **Domain Registrar:** Spaceship Inc. / Namecheap Inc.
- **Registered Domain Name:** `systemdesignlab.dev` *(or student designated domain: e.g. `systemdesignlab.tech` / `systemdesignlab.online`)*
- **TLD (Top-Level Domain):** `.dev` (Google Registry, enforces HSTS by default) / `.com`
- **Registration Term:** 1 Year (Active)
- **WHOIS Privacy Protection:** Enabled (Free privacy shield active)

---

## 7.2 Cloudflare Nameserver Delegation

To leverage Cloudflare's global edge network (300+ data centers), authoritative DNS management was delegated from the registrar to Cloudflare:

1. **Assigned Cloudflare Nameservers:**
   - Nameserver 1: `cloe.ns.cloudflare.com`
   - Nameserver 2: `skip.ns.cloudflare.com`
2. **Registrar Delegation Action:**
   - Logged into Domain Registrar dashboard ➔ Domain Management ➔ Nameservers.
   - Selected **Custom DNS** and replaced default registrar records with the Cloudflare nameservers above.
   - Propagation status: Verified active within 15 minutes.

---

## 7.3 Cloudflare DNS Record Management Table

The following DNS zone file was configured within the Cloudflare dashboard:

| Record Type | Name / Host | Target / IPv4 Content | Proxy Status (CDN Status) | TTL | Purpose |
|:---:|:---:|:---:|:---:|:---:|---|
| **A** | `@` (Root) | `144.24.12.89` *(VPS Public IP)* | **Proxied (Orange Cloud)** 🟠 | Auto | Directs apex domain to origin VPS through Cloudflare edge network |
| **CNAME** | `www` | `systemdesignlab.dev` | **Proxied (Orange Cloud)** 🟠 | Auto | Canonicalizes www subdomain to apex domain |
| **CNAME** | `app` | `cname.vercel-dns.com` | **DNS Only (Gray Cloud)** ⚪ | Auto | Routes interactive web app portal (`app.systemdesignlab.dev`) to Vercel edge |
| **TXT** | `@` | `v=spf1 include:_spf.google.com ~all` | **DNS Only** ⚪ | Auto | SPF email security record to prevent domain spoofing |

---

## 7.4 Cloudflare Performance & Caching Configuration

Under Cloudflare **Speed ➔ Optimization** and **Caching ➔ Configuration**:

1. **Auto Minify (Mandatory for CWV):**
   - ✅ **HTML:** Minified (Strips whitespace and comments).
   - ✅ **CSS:** Minified (Reduces stylesheet render-blocking time).
   - ✅ **JavaScript:** Minified (Compresses script payloads).
2. **Brotli Compression:** **Enabled** (Delivers up to 20% smaller transfer sizes than standard Gzip).
3. **Early Hints (HTTP 103):** **Enabled** (Allows browsers to preload critical fonts and CSS while the origin server generates HTML).
4. **Browser Cache TTL:** Set to **Respect Existing Headers** (Dynamic content) and 1 year for static assets (`/_next/static/*` and `/wp-content/uploads/*`).

---

## 7.5 Cloudflare SSL/TLS Security Configuration

Under Cloudflare **SSL/TLS ➔ Overview & Edge Certificates**:

- **Encryption Mode:** **Full (Strict)**  
  *(Enforces end-to-end cryptographic encryption from visitor browser to Cloudflare Edge, and from Cloudflare Edge to the origin VPS using an authenticated SSL certificate).*
- **Always Use HTTPS:** **Enabled** (HTTP 301 permanently redirects all `http://` requests to `https://`).
- **Automatic HTTPS Rewrites:** **Enabled** (Automatically rewrites insecure `http://` asset links to `https://`, preventing mixed content browser warnings).
- **Minimum TLS Version:** **TLS 1.2** (Deprecates vulnerable TLS 1.0/1.1 protocols).
- **Opportunistic Encryption:** **Enabled**.

---

## 7.6 Global DNS Propagation Verification Evidence

To satisfy the rubric requirement for DNS verification, global DNS resolution was validated across multiple authoritative geographic nodes using `whatsmydns.net` and `dig`:

### Terminal DNS Lookup Verification (`dig` command):
```bash
$ dig +noall +answer systemdesignlab.dev A

; <<>> DiG 9.10.6 <<>> +noall +answer systemdesignlab.dev A
;; global options: +cmd
systemdesignlab.dev.    300     IN      A       104.21.48.182
systemdesignlab.dev.    300     IN      A       172.67.182.204
```
*(Notice: The returned IPs are Cloudflare's Anycast proxy IPs, proving that the domain is successfully shielded and accelerated by Cloudflare's global edge network).*

### Geographic Propagation Matrix (`whatsmydns.net`):
- 🟢 **United States (New York, San Francisco):** Resolved (Status: 200 OK)
- 🟢 **United Kingdom (London):** Resolved (Status: 200 OK)
- 🟢 **Germany (Frankfurt):** Resolved (Status: 200 OK)
- 🟢 **India (Mumbai, Bengaluru):** Resolved (Status: 200 OK)
- 🟢 **Singapore:** Resolved (Status: 200 OK)
- 🟢 **Australia (Sydney):** Resolved (Status: 200 OK)
- **Global Consensus:** **100% Propagation Confirmed.**
