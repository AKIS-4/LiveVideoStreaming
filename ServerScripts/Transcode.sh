#!/bin/bash

# Define the Segmentation Server IP (Change this)
SEGMENTATION_SERVER_IP="x.x.x.x"

# Updating and installing dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install nginx libnginx-mod-rtmp ffmpeg -y 

# Configuring Nginx as an RTMP transcoding Server
sudo bash -c "cat > /etc/nginx/nginx.conf" <<EOF
worker_processes auto;
events {
    worker_connections 1024;
}

rtmp {
    server {
        listen 1935;  # RTMP Port

        application live {
            live on;
            record off;
            allow publish all;
            allow play all;

            # Transcoding Stream in 480p quality
            exec ffmpeg -i rtmp://localhost/live/$name -c:v libx264 -preset fast -b:v 500k -c:a aac -b:a 48k -f flv rtmp://$SEGMENTATION_SERVER_IP/live/$name_480p;

            # Transcoding Stream in 720p quality
            exec ffmpeg -i rtmp://localhost/live/$name -c:v libx264 -preset fast -b:v 1000k -c:a aac -b:a 96k -f flv rtmp://$SEGMENTATION_SERVER_IP/live/$name_720p;
        
            # Transcoding Stream in 1080p quality
            exec ffmpeg -i rtmp://localhost/live/$name -c:v libx264 -preset fast -b:v 1800k -c:a aac -b:a 194k -f flv rtmp://$SEGMENTATION_SERVER_IP/live/$name_1080p;

        }

        # application transcoded {
        #         live on;
        #         record off;
        #         allow publish all;
        #         allow play all;
        # }
        
    }
}
EOF

# Restarting nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
