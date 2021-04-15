export default class RtcClient {
  private rtcPeerConnection: RTCPeerConnection;
  private localPeerName: string;
  private remotePeerName: string;

  constructor() {
    const config = {
      iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = '';
    this.remotePeerName = '';
  }
}
