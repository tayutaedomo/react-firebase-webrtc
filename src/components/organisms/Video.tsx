import React, { RefObject, useRef, useState, VFC } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

import useDimensions from '../hooks/useDimensions';
import VolumeButton from '../molecules/VolumeButton';
import RtcClient from '../../utils/RtcClient';
import AudioAnalyser from '../web_audio/AudioAnalyser';

type Props = {
  isLocal: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  name: string;
  rtcClient: RtcClient;
};

const Video: VFC<Props> = (props) => {
  const { isLocal, name, videoRef, rtcClient } = props;
  const [muted, setMuted] = useState(rtcClient.initialAudioMuted);
  const refCard = useRef<HTMLElement | null>(null);
  const dimensionsCard = useDimensions(refCard);
  const refVolumeButton = useRef(null);
  const dimensionsVolumeButton = useDimensions(refVolumeButton);

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
        <VolumeButton
          muted={muted}
          setMuted={setMuted}
          refVolumeButton={refVolumeButton}
          rtcClient={rtcClient}
          isLocal={isLocal}
        />
        {!muted && videoRef.current && videoRef.current.srcObject && (
          <AudioAnalyser
            audio={videoRef.current.srcObject}
            width={dimensionsCard.width - dimensionsVolumeButton.width - 40}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default Video;
