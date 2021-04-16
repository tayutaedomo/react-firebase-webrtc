import React, { useEffect, useReducer, useState } from 'react';
import RtcClient from '../utils/RtcClient';

import InputFromLocal from './InputFromLocal';
import InputFromRemote from './InputFromRemote';
import VideoArea from './VideoArea';

const App = () => {
  const [rtcClient, _setRtcClient] = useState<RtcClient | null>(null);
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setRtcClient = (rtcClient: RtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  useEffect(() => {
    const client = new RtcClient(setRtcClient);
    client.setRtcClient();
  }, []);

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
