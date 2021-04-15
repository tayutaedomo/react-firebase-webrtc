import React, { LegacyRef, VFC } from 'react';

type Props = {
  isLocal: boolean;
  videoRef: LegacyRef<HTMLVideoElement>;
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
