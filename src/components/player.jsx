import React, { useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import Hls from "hls.js";


const LiveStream = () => {
  const videoRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const video = videoRef.current;
    const hlsUrl = `http://${import.meta.env.VITE_segment}:8080/hls/${id}.m3u8`; 

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
    <div className="flex items-center justify-center">
      <video className="rounded-3xl" ref={videoRef} controls width="1080" height="360" />
    </div>
  );
};

export default LiveStream;
