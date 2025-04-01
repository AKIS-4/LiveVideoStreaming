#!/bin/bash

# Define the Transcoding Server IP (Change this)
TRANSCODING_SERVER_IP="172.31.12.78"

echo "Updating and installing dependencies..."
sudo apt update
sudo apt upgrade -y
sudo apt install nginx libnginx-mod-rtmp -y 

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

        application ingest {
            live on;
            record off;

            # Forward stream to the transcoding server
            push rtmp://$TRANSCODING_SERVER_IP/live/\$name;
            
            allow publish all;
            allow play all;
        }
    }
}
EOF

echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "RTMP Ingest Server setup complete!"
