export default class RtcClient {
  private rtcPeerConnection: RTCPeerConnection;
  private _setRtcClient: (rtcClient: RtcClient) => void;

  public localPeerName: string;
  public remotePeerName: string;

  constructor(setRtcClient: (rtcClient: RtcClient) => void) {
    const config = {
      iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = '';
    this.remotePeerName = '';
    this._setRtcClient = setRtcClient;
  }

  setRtcClient() {
    this._setRtcClient(this);
  }
}
