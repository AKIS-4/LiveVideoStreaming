#!/bin/bash

# Variables
GITHUB_REPO_URL="https://github.com/AKIS-4/LiveVideoStreaming.git" 
FRONTEND_DIR="LiveVideoStreaming"    
BACKEND_DIR="Backend"     

# Updating system and installing dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm install -g pm2

# Clone Repository
git clone $GITHUB_REPO_URL

# Setup Backend
cd $FRONTEND_DIR/$BACKEND_DIR
npm install
pm2 start index.js --name backend
pm2 save
eval $(pm2 startup systemd | grep sudo)
pm2 save

# Deploy Code
# First edit .env file, then
cd ..
npm install
npm run build 
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/

# Restarting nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

