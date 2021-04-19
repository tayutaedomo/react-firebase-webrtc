import React from 'react';

import useRtcClient from './hooks/useRtcClient';
import InputForm from './templates/InputForm';
import VideoArea from './templates/VideoArea';

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
