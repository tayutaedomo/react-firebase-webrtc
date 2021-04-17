import firebase from 'firebase/app';
import 'firebase/database';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

export default class FirebaseSignalingClient {
  public database: firebase.database.Database;
  public localPeerName: string;
  public remotePeerName: string;

  constructor() {
    const firebaseConfig = {
      apiKey: REACT_APP_FIREBASE_API_KEY,
      authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
      projectId: REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: REACT_APP_FIREBASE_APP_ID,
    };
    if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();

    this.localPeerName = '';
    this.remotePeerName = '';
  }

  setPeerNames(localPeerName: string, remotePeerName: string) {
    this.localPeerName = localPeerName;
    this.remotePeerName = remotePeerName;
  }

  get targetRef() {
    const refName = `webrtc/${this.remotePeerName}`;
    return this.database.ref(refName);
  }

  async sendOffer(sessionDescription: string) {
    await this.targetRef.set({
      type: 'offer',
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async sendAnswer(sessionDescription: string) {
    this.targetRef.set({
      type: 'answer',
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async sendCandidate(candidate: RTCIceCandidateInit) {
    await this.targetRef.set({
      type: 'candidate',
      sender: this.localPeerName,
      candidate,
    });
  }

  async remove(path: string) {
    await this.database.ref(path).remove();
  }
}
