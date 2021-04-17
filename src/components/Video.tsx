import React, { RefObject, VFC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

type Props = {
  isLocal: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  name: string;
};

const Video: VFC<Props> = (props) => {
  const { isLocal, name, videoRef } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <video autoPlay={true} muted={isLocal} ref={videoRef} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
};

export default Video;
