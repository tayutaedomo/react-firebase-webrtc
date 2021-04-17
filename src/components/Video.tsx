import React, { RefObject, useRef, VFC } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

type Props = {
  isLocal: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  name: string;
};

const Video: VFC<Props> = (props) => {
  const { isLocal, name, videoRef } = props;
  const refCard = useRef<HTMLElement | null>(null);
  const node = refCard.current;
  const updateDimensions = (node: HTMLElement | null) => {
    return node === null
      ? {
          width: 0,
          height: 0,
        }
      : {
          width: node.offsetWidth,
          height: node.offsetHeight,
        };
  };
  const dimensionsCard = updateDimensions(node);

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay={true}
          muted={isLocal}
          ref={videoRef}
          width={dimensionsCard.width}
        />
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
