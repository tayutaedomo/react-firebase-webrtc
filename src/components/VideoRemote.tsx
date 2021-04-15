import React, { VFC } from 'react';

import Video from './Video';

type Props = {
  name: string;
};

const VideoRemote: VFC<Props> = (props) => {
  const { name } = props;
  const videoRef = null;

  return <Video isLocal={false} videoRef={videoRef} name={name} />;
};

export default VideoRemote;
