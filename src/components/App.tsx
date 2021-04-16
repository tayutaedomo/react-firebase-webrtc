import React from 'react';

import useRtcClient from './hooks/useRtcClient';
import InputForm from './InputForm';
import VideoArea from './VideoArea';

const App = () => {
  const rtcClient = useRtcClient();

  return (
    <>
      <InputForm rtcClient={rtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </>
  );
};

export default App;
