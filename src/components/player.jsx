import React, { useEffect, useRef } from "react";
import Hls from "hls.js";


const LiveStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const hlsUrl = "http://13.201.99.73:8080/hls/test.m3u8"; // Replace with your actual HLS URL

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }
  }, []);

  return (
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} controls width="640" height="360" />
    </div>
  );
};

export default LiveStream;
