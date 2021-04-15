import React, { useState } from 'react';

import InputFromLocal from './InputFromLocal';
import InputFromRemote from './InputFromRemote';
import VideoArea from './VideoArea';

const App = () => {
  const [localPeerName, setLocalPeerName] = useState('');
  const [remotePeerName, setRemotePeerName] = useState('');

  return (
    <>
      <InputFromLocal
        localPeerName={localPeerName}
        setLocalPeerName={setLocalPeerName}
      />
      <InputFromRemote
        localPeerName={localPeerName}
        remotePeerName={remotePeerName}
        setRemotePeerName={setRemotePeerName}
      />
      <VideoArea
        localPeerName={localPeerName}
        remotePeerName={remotePeerName}
      />
    </>
  );
};

export default App;
