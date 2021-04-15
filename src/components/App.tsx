import React from 'react';

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
  return (
    <>
      <InputFromLocal />
      <InputFromRemote />
    </>
  );
};

export default App;
