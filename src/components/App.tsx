import React from 'react';

import useRtcClient from './hooks/useRtcClient';
import InputFromLocal from './InputFromLocal';
import InputFromRemote from './InputFromRemote';
import VideoArea from './VideoArea';

const App = () => {
  const rtcClient = useRtcClient();

  if (rtcClient === null) return <></>;

  return (
    <>
      <InputFromLocal rtcClient={rtcClient} />
      <InputFromRemote rtcClient={rtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </>
  );
};

export default App;
