/// videoChat.ts
import Peer from 'simple-peer';

export const createPeerConnection = (initiator: boolean, stream: MediaStream): Peer.Instance => {
  return new Peer({
    initiator,
    trickle: false,
    stream
  });
};
