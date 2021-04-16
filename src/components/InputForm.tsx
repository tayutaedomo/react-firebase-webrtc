import React, { VFC } from 'react';
import RtcClient from '../utils/RtcClient';

import InputFromLocal from './InputFromLocal';
import InputFromRemote from './InputFromRemote';

type Props = {
  rtcClient: RtcClient | null;
};

const InputForm: VFC<Props> = (props) => {
  const { rtcClient } = props;

  if (rtcClient === null) return <></>;

  return (
    <>
      <InputFromLocal rtcClient={rtcClient} />
      <InputFromRemote rtcClient={rtcClient} />
    </>
  );
};

export default InputForm;
