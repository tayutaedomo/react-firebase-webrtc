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

  async answer(sender: string, sessionDescription: object) {
    try {
      this.remotePeerName = sender;
      this.setOnicecandidateCallback();
      this.setOntrack();
      await this.setRemoteDescription(sessionDescription);
      const answer = await this.rtcPeerConnection.createAnswer();
      await this.rtcPeerConnection.setLocalDescription(answer);
      await this.sendAnswer();
    } catch (err) {
      console.error(err);
    }
  }

  async connect(remotePeerName: string) {
    this.remotePeerName = remotePeerName;
    this.setOnicecandidateCallback();
    this.setOntrack();
    await this.offer();
    this.setRtcClient();
  }

  async setRemoteDescription(sessionDescription: object) {
    await this.rtcPeerConnection.setRemoteDescription(sessionDescription);
  }

  async sendAnswer() {
    this.firebaseSignalingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    );

    await this.firebaseSignalingClient.sendAnswer(this.localDescription);
  }

  get localDescription() {
    return this.rtcPeerConnection.localDescription?.toJSON();
  }

  async offer() {
    const description = await this.createOffer();
    if (description) {
      await this.setLocalDescription(description);
      await this.sendOffer();
    }
  }

  async createOffer() {
    try {
      return await this.rtcPeerConnection.createOffer();
    } catch (err) {
      console.error(err);
    }
  }

  async setLocalDescription(description: RTCSessionDescriptionInit) {
    try {
      await this.rtcPeerConnection.setLocalDescription(description);
    } catch (err) {
      console.error(err);
    }
  }

  async sendOffer() {
    this.firebaseSignalingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    );

    await this.firebaseSignalingClient.sendOffer(this.localDescription);
  }

  setOntrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (rtcTrackEvent.track.kind !== 'video') return;

      const remoteMediaStream = rtcTrackEvent.streams[0];
      if (this.remoteVideoRef && this.remoteVideoRef.current) {
        this.remoteVideoRef.current.srcObject = remoteMediaStream;
        this.setRtcClient();
      }
    };

    this.setRtcClient();
  }

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log({ event });
        // TODO: Send the candidate to the remote peer
      }
    };
  }

  async startListening(localPeerName: string) {
    this.localPeerName = localPeerName;
    this.setRtcClient();

    const refName = `webrtc/${localPeerName}`;
    await this.firebaseSignalingClient.remove(refName);
    this.firebaseSignalingClient.database
      .ref(refName)
      .on('value', async (snapshot) => {
        const data = snapshot.val();
        if (data === null) return;

        const { sender, sessionDescription, type } = data;
        switch (type) {
          case 'offer':
            await this.answer(sender, sessionDescription);
            break;

          default:
            break;
        }
      });
  }
}
