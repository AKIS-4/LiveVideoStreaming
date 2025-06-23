#!/bin/bash

# Define the Transcoding Server IP (Change this)
TRANSCODING_SERVER_IP="x.x.x.x"

# Updating and installing dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install nginx libnginx-mod-rtmp ffmpeg -y 

# Configuring Nginx as an RTMP Segmentation Server
sudo mkdir /var/www/html/hls
sudo chmod -R 755 /var/www/html/hls
sudo bash -c "cat > /etc/nginx/nginx.conf" <<EOF
load_module modules/ngx_rtmp_module.so;

worker_processes auto;
events {
    worker_connections 1024;
}

rtmp {
    server {
        listen 1935;
        chunk_size 4096;

        application live {
            live on;
            record off;

            hls on;
            hls_path /var/www/html/hls;

            # Segments Length 
            hls_fragment 1s;

            # playlist duration in .m3u8 file
            hls_playlist_length 3s;

            hls_continuous on;
            hls_cleanup on;

            allow publish $TRANSCODING_SERVER_IP;
            allow play all;
        }
    }
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;

        location /hls {
            root /var/www/html;

            add_header Cache-Control no-cache always;
            add_header Access-Control-Allow-Origin * always;
            add_header Access-Control-Allow-Methods 'GET, HEAD, OPTIONS' always;
            add_header Access-Control-Allow-Headers 'Origin, X-Requested-With, Content-Type, Accept' always;
            add_header Access-Control-Expose-Headers 'Content-Length, Content-Range' always;

            if ($request_method = 'OPTIONS') {
                add_header Content-Length 0;
                add_header Content-Type text/plain;
                return 204;
            }
        }
    }
}

EOF

# Restarting nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# Automating uploading video file to S3 
# First create IAM role and attach to segmentation server, then...

# Installing dependencies
sudo apt install unzip inotify-tools -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Create inotify script to watch and upload video files to s3
sudo touch /usr/local/bin/s3-sync-hls.sh
sudo touch /var/log/s3sync.log
sudo chown ubuntu:ubuntu /var/log/s3sync.log 
sudo bash -c "cat > /usr/local/bin/s3-sync-hls.sh" <<EOF
#!/bin/bash

WATCH_DIR="/var/www/html/hls"
LOG_FILE="/var/log/s3sync.log"
BUCKET_NAME="xxx" # Change this

echo "Started S3 sync watcher on $WATCH_DIR" >> "$LOG_FILE"

inotifywait -m -e close_write --format '%w%f' "$WATCH_DIR" | while read FILE
do
    FILENAME=$(basename "$FILE")
    BASE=$(echo "$FILENAME" | cut -d'.' -f1) #Remove extension
    USERNAME=$(echo "$BASE" | cut -d'_' -f1) 
    VIDEONAME=$(echo "$BASE" | cut -d'_' -f2 | cut -d'-' -f1) 

    echo "Detected: $FILENAME" >> "$LOG_FILE"

    if [[ -n "$USERNAME" && -n "$VIDEONAME" ]]; then
        aws s3 cp "$FILE" "s3://$BUCKET_NAME/$USERNAME/$VIDEONAME/$FILENAME" >> "$LOG_FILE" 2>&1
        echo "Uploaded: $FILENAME" >> "$LOG_FILE"
    else
        echo "Skipping: $FILENAME" >> "$LOG_FILE"
    fi
done

EOF
sudo chmod +x /usr/local/bin/s3-sync-hls.sh

# Create Service to run inotify script continuously
sudo touch /etc/systemd/system/s3-sync-hls.service
sudo bash -c "cat > /etc/systemd/system/s3-sync-hls.service" <<EOF
[Unit]
Description=Inotify S3 Sync Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/s3-sync-hls.sh
Restart=always
RestartSec=3
User=ubuntu
Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

[Install]
WantedBy=multi-user.target

EOF

# Reload and enable the service 
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable --now s3-sync-hls.service

# To monitor (optional)
# sudo journalctl -u s3-sync-hls.service -f
# sudo tail -f /var/log/s3sync.log
# sudo watch ls /var/www/html/hls
