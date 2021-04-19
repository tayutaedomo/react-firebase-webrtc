import React, { VFC } from 'react';
import RtcClient from '../../utils/RtcClient';

import Video from './Video';

type Props = {
  rtcClient: RtcClient;
};

const VideoRemote: VFC<Props> = (props) => {
  const { rtcClient } = props;
  const videoRef = rtcClient.remoteVideoRef;

  if (rtcClient.remotePeerName === '') return <></>;

  return (
    <Video
      isLocal={false}
      videoRef={videoRef}
      name={rtcClient.remotePeerName}
      rtcClient={rtcClient}
    />
  );
};

export default VideoRemote;
