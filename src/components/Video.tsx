import React, { RefObject, useRef, useState, VFC } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

import useDimensions from './hooks/useDimensions';
import VolumeButton from './molecules/VolumeButton';

type Props = {
  isLocal: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  name: string;
};

const Video: VFC<Props> = (props) => {
  const [muted, setMuted] = useState(true);
  const { isLocal, name, videoRef } = props;
  const refCard = useRef<HTMLElement | null>(null);
  const dimensionsCard = useDimensions(refCard);

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay={true}
          muted={isLocal || muted}
          ref={videoRef}
          width={dimensionsCard.width}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <VolumeButton muted={muted} setMuted={setMuted} />
      </CardActions>
    </Card>
  );
};

export default Video;
