import React, { VFC } from 'react';
import RtcClient from '../../utils/RtcClient';

import InputFormLocal from '../organisms/InputFormLocal';
import InputFormRemote from '../organisms/InputFormRemote';

type Props = {
  rtcClient: RtcClient | null;
};

const InputForm: VFC<Props> = (props) => {
  const { rtcClient } = props;

  if (rtcClient === null) return <></>;

  return (
    <>
      <InputFormLocal rtcClient={rtcClient} />
      <InputFormRemote rtcClient={rtcClient} />
    </>
  );
};

export default InputForm;
