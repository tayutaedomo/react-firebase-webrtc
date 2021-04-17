import { useEffect, useReducer, useRef, useState } from 'react';

import RtcClient from '../../utils/RtcClient';

const useRtcClient = () => {
  const [rtcClient, _setRtcClient] = useState<RtcClient | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setRtcClient = (rtcClient: RtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  useEffect(() => {
    const init = async () => {
      const client = new RtcClient(remoteVideoRef, setRtcClient);
      await client.setMediaStream();
    };

    init();
  }, []);

  return rtcClient;
};

export default useRtcClient;
