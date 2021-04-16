import React, { useEffect, useRef, VFC } from 'react';
import RtcClient from '../utils/RtcClient';

import Video from './Video';

type Props = {
  rtcClient: RtcClient;
};

const VideoLocal: VFC<Props> = (props) => {
  const { rtcClient } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = videoRef.current;
  const mediaStream = rtcClient.mediaStream;

  useEffect(() => {
    if (currentVideoRef === null) return;
    currentVideoRef.srcObject = mediaStream;
  }, [currentVideoRef, mediaStream]);

  return (
    <div>
      <Video
        isLocal={true}
        videoRef={videoRef}
        name={rtcClient.localPeerName}
      />
    </div>
  );
};

export default VideoLocal;
