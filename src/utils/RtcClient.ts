export default class RtcClient {
  private rtcPeerConnection: RTCPeerConnection;
  private _setRtcClient: (rtcClient: RtcClient) => void;

  public localPeerName: string;
  public remotePeerName: string;
  public mediaStream: MediaStream | null;

  constructor(setRtcClient: (rtcClient: RtcClient) => void) {
    const config = {
      iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
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
}