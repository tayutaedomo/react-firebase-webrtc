import React, { VFC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VideoLocal from './VideoLocal';

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
  localPeerName: string;
  remotePeerName: string;
};

const VideoArea: VFC<Props> = (props) => {
  const { localPeerName, remotePeerName } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <VideoLocal name={localPeerName} />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
};

export default VideoArea;
