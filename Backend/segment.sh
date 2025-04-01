#!/bin/bash

# Define the Transcoding Server IP (Change this)
TRANSCODING_SERVER_IP="172.31.12.78"

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

        application ingest {
            live on;
            record off;

            hls on;
            hls_path /var/www/html/hls;
            hls_playlist_length 10s;
            
            allow publish $TRANSCODING_SERVER_IP;
            allow play all;
        }
    }
}
EOF

sudo touch /etc/nginx/sites-available/hls
echo "Configuring http for hls streaming through m3u8 format..."
sudo bash -c "cat > /etc/nginx/sites-available/hls" <<EOF
worker_processes auto;
events {
    worker_connections 1024;
}

server {
    listen 8080;

    location /hls {
    
        #Segment storage format
        root /var/www/html;
        types{
            application/vnd.apple.mpegurl m3u8;
            video/mp2t ts;
        }

        # Fixing CORS 
        add_header Cache-Control no-cache;
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, HEAD, OPTIONS';
        add_header Acess-Control-Allow-Headers 'Origin, X-Requested-With, Content-Type, Accept';
    }
}
EOF



echo "Restarting Nginx..."
sudo systemctl restart nginx

echo "RTMP Ingest Server setup complete!"
