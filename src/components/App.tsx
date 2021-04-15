import React, { useReducer, useState } from 'react';
import RtcClient from '../utils/RtcClient';

import InputFromLocal from './InputFromLocal';
import InputFromRemote from './InputFromRemote';
import VideoArea from './VideoArea';

const App = () => {
  const [rtcClient, _setRtcClient] = useState<RtcClient>(new RtcClient());
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setRtcClient = (rtcClient: RtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  return (
    <>
      <InputFromLocal rtcClient={rtcClient} setRtcClient={setRtcClient} />
      <InputFromRemote rtcClient={rtcClient} setRtcClient={setRtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </>
  );
};

export default App;
