import React, { VFC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import VideoLocal from './VideoLocal';
import VideoRemote from './VideoRemote';
import RtcClient from '../utils/RtcClient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

type Props = {
  rtcClient: RtcClient | null;
};

const VideoArea: VFC<Props> = (props) => {
  const { rtcClient } = props;
  const classes = useStyles();

  if (rtcClient === null) return <></>;
  if (rtcClient.localPeerName === '') return <></>;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <VideoLocal rtcClient={rtcClient} />
        </Grid>
        <Grid item xs={6}>
          <VideoRemote rtcClient={rtcClient} />
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoArea;
