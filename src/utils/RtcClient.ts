import { RefObject } from 'react';

import FirebaseSignalingClient from './FirebaseSignalingClient';

export default class RtcClient {
  private rtcPeerConnection: RTCPeerConnection;
  private firebaseSignalingClient: FirebaseSignalingClient;
  private _setRtcClient: (rtcClient: RtcClient) => void;

  public localPeerName: string;
  public remotePeerName: string;
  public remoteVideoRef: RefObject<HTMLVideoElement>;
  public mediaStream: MediaStream | null;

  constructor(
    remoteVideoRef: RefObject<HTMLVideoElement>,
    setRtcClient: (rtcClient: RtcClient) => void
  ) {
    const config = {
      iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignalingClient = new FirebaseSignalingClient();
    this.localPeerName = '';
    this.remotePeerName = '';
    this.remoteVideoRef = remoteVideoRef;
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
  }

  setRtcClient() {
    this._setRtcClient(this);
  }

  async getUserMedia() {
    try {
      const constraints = { audio: true, video: true };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      console.error(err);
    }
  }

  async setMediaStream() {
    await this.getUserMedia();
    this.addTracks();
    this.setRtcClient();
  }

  addTracks() {
    this.addAudioTrack();
    this.addVideoTrack();
  }

  addAudioTrack() {
    const audioTrack = this.audioTrack;
    if (audioTrack && this.mediaStream)
      this.rtcPeerConnection.addTrack(audioTrack, this.mediaStream);
  }

  addVideoTrack() {
    const videoTrack = this.videoTrack;
    if (videoTrack && this.mediaStream)
      this.rtcPeerConnection.addTrack(videoTrack, this.mediaStream);
  }

  get audioTrack() {
    return this.mediaStream?.getAudioTracks()[0];
  }

  get videoTrack() {
    return this.mediaStream?.getVideoTracks()[0];
  }

  startListening(localPeerName: string) {
    this.localPeerName = localPeerName;
    this.setRtcClient();

    this.firebaseSignalingClient.database
      .ref(`webrtc/${localPeerName}`)
      .on('value', (snapshot) => {
        console.log(snapshot.val());
      });
  }
}
