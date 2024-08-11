'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MediaConnection } from 'peerjs';
import useLocalStream from '@/hooks/useLocalstreams';
import { usePeer } from '@/context/peercontext';
import { useOutgoingCall } from '@/context/outgoingcall';

interface IncomingCallContextProps {
  incomingCall: MediaConnection | null;
  setIncomingCall: (call: MediaConnection | null) => void;
  callAccepted: boolean;
  setCallAccepted: (accepted: boolean) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;  // Add endCall to the context
  localStream: MediaStream | null;
  startVideo: () => Promise<MediaStream | null>;
  stopVideo: () => void;
  error: string | null;
}

const IncomingCallContext = createContext<IncomingCallContextProps | undefined>(undefined);

export const useIncomingCall = () => {
  const context = useContext(IncomingCallContext);
  if (!context) {
    throw new Error('useIncomingCall must be used within an IncomingCallProvider');
  }
  return context;
};

export const IncomingCallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const { localStream, startVideo, stopVideo, error } = useLocalStream();
  const peer = usePeer();
  const { notifyCallAccepted } = useOutgoingCall();

  useEffect(() => {
    if (peer) {
      peer.on('call', (call: MediaConnection) => {
        console.log('Received call:', call);
        setIncomingCall(call);
      });
    }
  }, [peer]);

  const acceptCall = async () => {
    if (incomingCall) {
      const stream = await startVideo();
      if (stream) {
        incomingCall.answer(stream);
        incomingCall.on('stream', (remoteStream) => {
          const videoElement = document.getElementById('remote-video') as HTMLVideoElement;
          if (videoElement) {
            videoElement.srcObject = remoteStream;
            videoElement.onloadedmetadata = () => {
              videoElement.play().catch(err => console.error('Error playing remote video:', err));
            };
          }
        });
        setCallAccepted(true);
        console.log('Call accepted in IncomingCallContext:', true);
        notifyCallAccepted();
      }
    }
  };
  

  const rejectCall = () => {
    if (incomingCall) {
      incomingCall.close();
      setIncomingCall(null);
      setCallAccepted(false);
      console.log('Call rejected in IncomingCallContext:', false);
    }
  };

  const endCall = () => {
    if (incomingCall) {
      incomingCall.close();
      setIncomingCall(null);
    }
    stopVideo(); // Stop the local video stream
    setCallAccepted(false);
    console.log('Call ended in IncomingCallContext:', false);
  };

  return (
    <IncomingCallContext.Provider
      value={{
        incomingCall,
        setIncomingCall,
        callAccepted,
        setCallAccepted,
        acceptCall,
        rejectCall,
        endCall,  // Provide the endCall method
        localStream,
        startVideo,
        stopVideo,
        error,
      }}
    >
      {children}
    </IncomingCallContext.Provider>
  );
};
