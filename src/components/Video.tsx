import React, { RefObject, VFC } from 'react';

type Props = {
  isLocal: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  name: string;
};

const Video: VFC<Props> = (props) => {
  const { isLocal, name, videoRef } = props;

  return (
    <div>
      <video autoPlay={true} muted={isLocal} ref={videoRef} />
      <div>{name}</div>
    </div>
  );
};

export default Video;
