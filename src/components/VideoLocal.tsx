import React, { useEffect, useRef, VFC } from 'react';

import Video from './Video';

type Props = {
  name: string;
};

const VideoLocal: VFC<Props> = (props) => {
  const { name } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = videoRef.current;

  useEffect(() => {
    if (currentVideoRef === null) return;

    const getMedia = async () => {
      const constraints = { audio: true, video: true };

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        currentVideoRef.srcObject = mediaStream;
      } catch (err) {
        console.error(err);
      }
    };

    getMedia();
  }, [currentVideoRef]);

  return (
    <div>
      <Video isLocal={true} videoRef={videoRef} name={name} />
    </div>
  );
};

export default VideoLocal;
