import React, { useState } from 'react';

import InputFromLocal from './InputFromLocal';
import InputFromRemote from './InputFromRemote';

const getMedia = async () => {
  const constraints = { audio: true, video: true };

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.error(err);
  }
};

getMedia();

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
        remotePeerName={remotePeerName}
        setRemotePeerName={setRemotePeerName}
      />
    </>
  );
};

export default App;
