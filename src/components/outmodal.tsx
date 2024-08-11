'use client';
import React, { useEffect, useRef } from 'react';
import { useOutgoingCall } from '@/context/outgoingcall';

const OutgoingCallModal: React.FC = () => {
  const { callStarted, callAccepted, endCall } = useOutgoingCall();
  const callSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (callStarted && !callAccepted) {
      callSoundRef.current?.play().catch(err => console.error('Error playing sound:', err));
    } else {
      callSoundRef.current?.pause();
    }
  }, [callStarted, callAccepted]);

  if (!callStarted || callAccepted) return null;

  return (
    <div className="outgoing-call-modal">
      <div className="modal-content">
        <h3 className="text-black">Calling...</h3>
        <button onClick={endCall}>End Call</button>
      </div>
      <audio ref={callSoundRef} src="/audio/ring.mp3" loop />
      <style jsx>{`
        .outgoing-call-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .modal-content button {
          margin: 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default OutgoingCallModal;
