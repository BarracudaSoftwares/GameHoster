# GameHoster
# UNTESTED 
GameHoster is a Pterodactyl-based server management panel designed for easy game server hosting. It allows users to create, manage, and host game servers with various customizable options.

## Features
- Easy-to-use web interface
- Pterodactyl API integration
- User roles and permissions management
- Server creation and configuration
- Admin dashboard for oversight

## Prerequisites
- Node.js (v14 or newer)
- npm (v6 or newer)
- A server running Pterodactyl Panel
- A VPS with Ubuntu 20.04 or newer (for hosting this application)

## VPS Deployment Guide

### 1. Prepare Your VPS

```bash
# Update your system
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Install additional dependencies
sudo apt install -y git
```

### 2. Clone and Configure the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/gamehoster.git
cd gamehoster

# Install dependencies
npm install

# Configure your Pterodactyl connection
# Edit Config/pterodactyl.json with your details
nano Config/pterodactyl.json
```

Update the pterodactyl.json file with your actual Pterodactyl panel URL and API key:
```json
{
  "url": "https://your-actual-pterodactyl-url",
  "api_key": "your-actual-api-key",
  "port": 8080
}
```

### 3. Set Up Environment Variables (Optional)

Create a .env file for sensitive configuration:
```bash
nano .env
```

Add your environment variables:
```
PTERODACTYL_URL=https://your-panel-url
PTERODACTYL_API_KEY=your-api-key
PORT=3000
```

### 4. Run the Application

For testing:
```bash
npm start
```

### 5. Set Up as a Service (For Production)

Create a service file:
```bash
sudo nano /etc/systemd/system/gamehoster.service
```

Add the following content:
```
[Unit]
Description=GameHoster Panel
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/path/to/gamehoster
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable gamehoster
sudo systemctl start gamehoster
sudo systemctl status gamehoster
```

### 6. Set Up Nginx as a Reverse Proxy (Recommended)

Install Nginx:
```bash
sudo apt install -y nginx
```

Create a site configuration:
```bash
sudo nano /etc/nginx/sites-available/gamehoster
```

Add the configuration:
```
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/gamehoster /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Set Up SSL with Certbot (Recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Troubleshooting

1. **Connection Issues with Pterodactyl**
   - Verify your API key has proper permissions
   - Ensure your Pterodactyl URL is correct and accessible from your VPS

2. **Application Won't Start**
   - Check logs with `journalctl -u gamehoster`
   - Verify all dependencies are installed with `npm install`

3. **Permission Issues**
   - Ensure proper file permissions with `sudo chown -R $USER:$USER /path/to/gamehoster`

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch: `git checkout -b new-feature`
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
