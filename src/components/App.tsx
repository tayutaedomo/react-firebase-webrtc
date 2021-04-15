import React from 'react';
import { Button } from '@material-ui/core';

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
      <Button color="primary" variant="outlined">
        Hello, World!
      </Button>
    </>
  );
};

export default App;
