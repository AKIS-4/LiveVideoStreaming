#!/bin/bash

# Define the Transcoding and API Server IP (Change this)
TRANSCODING_SERVER_IP="x.x.x.x"
API_SERVER_IP="x.x.x.x"

# Updating and installing dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install nginx libnginx-mod-rtmp -y 

# Configuring Nginx as an RTMP Ingest Server
sudo bash -c "cat > /etc/nginx/nginx.conf" <<EOF
worker_processes auto;
events {
    worker_connections 1024;
}

rtmp {
    server {
        listen 1935;  # RTMP Port
        chunk_size 4096;

        application ingest {
            live on;
            record off;

            #Stream key authentication
	        on_publish http://$API_SERVER_IP:3000/api/video/stream-auth;
            on_publish_done http://$API_SERVER_IP:3000/api/video/deletevideo;

            # Forward stream to the transcoding server
            push rtmp://$TRANSCODING_SERVER_IP/live;
            
            allow publish all;
            allow play all;
        }
    }
}
EOF

# Restarting nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

