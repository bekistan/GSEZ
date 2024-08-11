// OutgoingCallContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MediaConnection } from 'peerjs';
import useLocalStream from '@/hooks/useLocalstreams';
import { usePeer } from '@/context/peercontext';

interface OutgoingCallContextProps {
  outgoingCall: MediaConnection | null;
  callStarted: boolean;
  callAccepted: boolean;
  startCall: (peerId: string) => void;
  endCall: () => void;
  notifyCallAccepted: () => void;
  localStream: MediaStream | null;
  startVideo: () => Promise<MediaStream | null>;
  stopVideo: () => void;
  error: string | null;
}

const OutgoingCallContext = createContext<OutgoingCallContextProps | undefined>(undefined);

export const useOutgoingCall = () => {
  const context = useContext(OutgoingCallContext);
  if (!context) {
    throw new Error('useOutgoingCall must be used within an OutgoingCallProvider');
  }
  return context;
};

export const OutgoingCallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [outgoingCall, setOutgoingCall] = useState<MediaConnection | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const { localStream, startVideo, stopVideo, error } = useLocalStream();
  const peer = usePeer();

  const startCall = async (peerId: string) => {
    try {
      const stream = await startVideo();
      if (stream && peer) {
        const call = peer.call(peerId, stream);
        if (call) {
          call.on('stream', (remoteStream) => {
            const videoElement = document.getElementById('remote-video') as HTMLVideoElement;
            if (videoElement) {
              videoElement.srcObject = remoteStream;
              videoElement.onloadedmetadata = () => {
                videoElement.play().catch(err => console.error('Error playing remote video:', err));
              };
            }
          });
          setOutgoingCall(call);
          setCallStarted(true);
          setCallAccepted(false); // Ensure callAccepted is reset
          console.log('Call started:', true);
        } else {
          console.error('Failed to establish call. Peer connection may be unavailable.');
        }
      } else {
        console.error('Local stream is not available.');
      }
    } catch (error) {
      console.error('Error starting video stream:', error);
    }
  };

  const endCall = () => {
    if (outgoingCall) {
      outgoingCall.close();
      setOutgoingCall(null);
    }
    setCallStarted(false);
    setCallAccepted(false);
    console.log('Call ended:', false);
    stopVideo();
  };

  const notifyCallAccepted = () => {
    console.log('OutgoingCallContext: Call accepted, updating state');
    setCallAccepted(true);
  };

  useEffect(() => {
    console.log('OutgoingCallContext State:', { callStarted, callAccepted });
  }, [callStarted, callAccepted]);

  return (
    <OutgoingCallContext.Provider
      value={{
        outgoingCall,
        callStarted,
        callAccepted,
        startCall,
        endCall,
        notifyCallAccepted,
        localStream,
        startVideo,
        stopVideo,
        error,
      }}
    >
      {children}
    </OutgoingCallContext.Provider>
  );
};
