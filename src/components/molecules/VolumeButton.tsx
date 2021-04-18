import React, { VFC } from 'react';
import { IconButton } from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';

type Props = {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

const VolumeButton: VFC<Props> = (props) => {
  const { muted, setMuted } = props;

  const Icon = muted ? VolumeOff : VolumeUp;

  return (
    <IconButton
      aria-label="switch mute"
      onClick={() => {
        setMuted((prev) => !prev);
      }}
    >
      <Icon />
    </IconButton>
  );
};

export default VolumeButton;
