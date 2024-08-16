import React, { useEffect, useRef } from 'react';

const LiveStream = ({ streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = streamUrl;
    }
  }, [streamUrl]);

  return (
    <div className="flex justify-center items-center h-full bg-gray-900">
      <video
        ref={videoRef}
        autoPlay
        controls
        className="w-full max-w-screen-lg rounded-lg shadow-lg"
      />
    </div>
  );
};

export default LiveStream;
