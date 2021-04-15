import React, { useEffect, useRef, VFC } from 'react';

type Props = {
  localPeerName: string;
};

const VideoLocal: VFC<Props> = (props) => {
  const { localPeerName } = props;
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

  return <div></div>;
};

export default VideoLocal;
