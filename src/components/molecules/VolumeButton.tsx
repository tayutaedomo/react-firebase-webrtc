import React, { VFC } from 'react';
import { IconButton } from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import RtcClient from '../../utils/RtcClient';

type Props = {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  rtcClient: RtcClient;
  isLocal: boolean;
};

const VolumeButton: VFC<Props> = (props) => {
  const { muted, setMuted, rtcClient, isLocal } = props;

  const Icon = muted ? VolumeOff : VolumeUp;

  return (
    <IconButton
      aria-label="switch mute"
      onClick={() => {
        setMuted((prev) => !prev);
        if (isLocal) rtcClient.toggleAudio();
      }}
    >
      <Icon />
    </IconButton>
  );
};

export default VolumeButton;
