import FirebaseSignalingClient from './FirebaseSignalingClient';

export default class RtcClient {
  private rtcPeerConnection: RTCPeerConnection;
  private firebaseSignalingClient: FirebaseSignalingClient;
  private _setRtcClient: (rtcClient: RtcClient) => void;

  public localPeerName: string;
  public remotePeerName: string;
  public mediaStream: MediaStream | null;

  constructor(setRtcClient: (rtcClient: RtcClient) => void) {
    const config = {
      iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignalingClient = new FirebaseSignalingClient();
    this.localPeerName = '';
    this.remotePeerName = '';
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
