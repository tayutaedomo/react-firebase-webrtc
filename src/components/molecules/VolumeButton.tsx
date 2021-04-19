import React, { RefObject, VFC } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import RtcClient from '../../utils/RtcClient';

const useStyles = makeStyles({
  icon: {
    height: '1.5em',
    width: '1.5em',
  },
});

type Props = {
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  refVolumeButton: RefObject<any>;
  rtcClient: RtcClient;
  isLocal: boolean;
};

const VolumeButton: VFC<Props> = (props) => {
  const { muted, setMuted, refVolumeButton, rtcClient, isLocal } = props;
  const classes = useStyles();

  const Icon = muted ? VolumeOff : VolumeUp;

  return (
    <IconButton
      aria-label="switch mute"
      onClick={() => {
        setMuted((prev) => !prev);
        if (isLocal) rtcClient.toggleAudio();
      }}
      ref={refVolumeButton}
    >
      <Icon className={classes.icon} />
    </IconButton>
  );
};

export default VolumeButton;
