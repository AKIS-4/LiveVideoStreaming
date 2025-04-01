#!/bin/bash

# Define the Transcoding Server IP (Change this)
SEGMENTATION_SERVER_IP="172.31.6.193"

echo "Updating and installing dependencies..."
sudo apt update
sudo apt upgrade -y
sudo apt install nginx libnginx-mod-rtmp -y 
sudo apt install ffmpeg -y

echo "Configuring Nginx as an RTMP Ingest Server..."
sudo bash -c "cat > /etc/nginx/nginx.conf" <<EOF
worker_processes auto;
events {
    worker_connections 1024;
}

rtmp {
    server {
        listen 1935;  # RTMP Port
        chunk_size 4096;

        allow publish all;
        allow play all;

        # Transcoding Stream in 480p quality
        exec ffmpeg -i rtmp://localhost/live/$name -c:v libx264 -preset fast -b:v 500k -c:a aac -b:a 48k -f flv rtmp:$SEGMENTATION_SERVER_IP/$name_480p//

        # Transcoding Stream in 720p quality
        exec ffmpeg -i rtmp://localhost/live/$name -c:v libx264 -preset fast -b:v 1000k -c:a aac -b:a 96k -f flv rtmp:$SEGMENTATION_SERVER_IP/$name_720p//
        
        # Transcoding Stream in 1080p quality
        exec ffmpeg -i rtmp://localhost/live/$name -c:v libx264 -preset fast -b:v 1800k -c:a aac -b:a 194k -f flv rtmp:$SEGMENTATION_SERVER_IP/$name_1080p//

        application ingest {
            live on;
            record off;
        }
    }
}
EOF

echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "RTMP Ingest Server setup complete!"
