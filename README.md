
# Cloud Based Live Video Streaming 

In short, I first created MERN application and deployed it on EC2.Then,I created three instances for video processing. 
1) Ingest Server (Works like pop server)
2) Transcoding Server (For creating multiple bitrate files of input video stream)
3) Segmentation Server (For segmentating the video streams, Streaming it through HLS to Cloudfront and storing video files in S3)

## Architecture

![App Screenshot](public/arch.png)

## Server Setup
ServerScripts folder contains all four server's bash script files to setup up all four servers. 

## Single Stream 

### Single video stream with latency is in between 10 to 20 sec
![App Screenshot](public/single-1.png)

### Video streams coming from Transcoding Server
![App Screenshot](public/single-4.png)

### Logs of Segmentation Server sending video(.ts) files to S3 storage.
![App Screenshot](public/single-3.png)

### Video stored in S3 bucket came from Segmentation Server.
![App Screenshot](public/single-2.png)


## Multiple Stream

### Multiple Video stream 
#### Frontend
![App Screenshot](public/multiple-4.jpeg)
#### First Stream 
![App Screenshot](public/multiple-3.jpeg)
#### Second Stream
![App Screenshot](public/multiple-2.jpeg)

### Video streams coming from Transcoding Server
![App Screenshot](public/multiple-5.jpeg)

### Logs of Segmentation Server sending video(.ts) files to S3 storage.
![App Screenshot](public/multiple-6.jpeg)

### Video stored in S3 bucket came from Segmentation Server.
![App Screenshot](public/multiple-1.png)