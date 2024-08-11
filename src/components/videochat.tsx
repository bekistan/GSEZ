'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePeer } from '@/context/peercontext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useIncomingCall } from '@/context/incomingcall';
import { useOutgoingCall } from '@/context/outgoingcall';
import { useAuth } from '@/hooks/useAuth';
import IncomingCallModal from '@/components/modal';
import OutgoingCallModal from '@/components/outmodal';

const VideoChat: React.FC = () => {
  const peer = usePeer();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [motumma, setMotumma] = useState('FbHAh6SYSucDerqq2fR1GRldFHK2');
  const [fullname, setFullname] = useState('Motuma Temesgen');
  const { incomingCall, callAccepted, localStream, startVideo, stopVideo, endCall: endIncomingCall, error } = useIncomingCall();
  const { outgoingCall, callStarted, startCall, endCall: endOutgoingCall, localStream: outgoingLocalStream } = useOutgoingCall();
  const { user } = useAuth();

  useEffect(() => {
    if (localStream && myVideoRef.current) {
      myVideoRef.current.srcObject = localStream;
      myVideoRef.current.onloadedmetadata = () => {
        myVideoRef.current?.play().catch(err => console.error('Error playing local video:', err));
      };
    }
  }, [localStream]);

  useEffect(() => {
    if (outgoingLocalStream && myVideoRef.current) {
      myVideoRef.current.srcObject = outgoingLocalStream;
      myVideoRef.current.onloadedmetadata = () => {
        myVideoRef.current?.play().catch(err => console.error('Error playing local video:', err));
      };
    }
  }, [outgoingLocalStream]);

  useEffect(() => {
    if (peer) {
      peer.on('open', (id: string) => {
        setMyId(id);
      });

      peer.on('error', (err: Error) => {
        console.error('PeerJS error:', err);
      });

      return () => {
        peer.off('open');
        peer.off('error');
      };
    }
  }, [peer]);

  const handleCallUser = async () => {
    try {
      const userDocRef = doc(db, 'users', motumma);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const peerId = userDocSnap.data().peerId;
        const fname = userDocSnap.data().fullname;
        setFullname(fname);
        startCall(peerId);
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.error('Error calling user:', error);
    }
  };

  const handleEndCall = () => {
    endIncomingCall();
    endOutgoingCall();
  };

  return (
    <div className="video-chat-container">
      {error && <p className="error-message">{error}</p>}
      <div className="video-container">
        <div className="video-wrapper">
          <video ref={myVideoRef} className="video-element local-video" muted autoPlay />
        </div>
        <div className="video-wrapper">
          <video id="remote-video" ref={userVideoRef} className="video-element remote-video" autoPlay />
        </div>
      </div>
      {user?.uid !== motumma && (
        <div className="controls">
          <input
            type="text"
            className="user-id-input text-black"
            placeholder="User ID to call"
            value={fullname}
            onChange={(e) => setMotumma(e.target.value)}
          />
          <button className="call-button" onClick={handleCallUser}>Call</button>
        </div>
      )}
      <div className="controls">
        {(callAccepted || callStarted) && <button className="mt-5 w-full end-button" onClick={handleEndCall}>End Call</button>}
      </div>

      <style jsx>{`
        .video-chat-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: gray-600;
          padding: 20px;
          box-sizing: border-box;
        }
        .error-message {
          color: red;
          margin: 10px 0;
        }
        .video-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          height: 70vh;
          background: #000;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .video-wrapper {
          width: 48%;
          height: 100%;
          background: #000;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .video-element {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 10px;
        }
        .controls {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          gap: 10px;
        }
        .user-id-input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 250px;
        }
        .call-button, .end-button {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .call-button:hover, .end-button:hover {
          background-color: #45a049;
        }
        .call-button {
          background-color: #4caf50;
        }
        .end-button {
          background-color: #f44336;
        }
      `}</style>
      <IncomingCallModal />
      <OutgoingCallModal />
    </div>
  );
};

export default VideoChat;
