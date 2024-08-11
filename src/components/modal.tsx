'use client';
import React, { useEffect, useRef } from 'react';
import { useIncomingCall } from '@/context/incomingcall';
import { useRouter } from 'next/navigation';
import { useOutgoingCall } from '@/context/outgoingcall';

const IncomingCallModal: React.FC = () => {
  const { incomingCall, acceptCall, rejectCall, callAccepted } = useIncomingCall();
  const { notifyCallAccepted } = useOutgoingCall();
  const router = useRouter();
  const ringSoundRef = useRef<HTMLAudioElement>(null);

  const handleAccept = async () => {
    await acceptCall();
    notifyCallAccepted();
    ringSoundRef.current?.pause();
    router.push('/userdashboard/videochat');
  };

  const handleReject = () => {
    rejectCall();
    ringSoundRef.current?.pause();
  };

  useEffect(() => {
    if (incomingCall) {
      ringSoundRef.current?.play();
    } else {
      ringSoundRef.current?.pause();
    }
  }, [incomingCall]);

  if (!incomingCall || callAccepted) return null;

  return (
    <div className="incoming-call-modal">
      <div className="modal-content">
        <h3 className="text-black">Incoming Call</h3>
        <p className="text-gray-500">From: {incomingCall.peer}</p>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button>
      </div>
      <audio ref={ringSoundRef} src="/audio/ring.mp3" loop />
      <style jsx>{`
        .incoming-call-modal {
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
        }
        .modal-content button:first-of-type {
          background-color: #4caf50;
          color: white;
        }
        .modal-content button:last-of-type {
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default IncomingCallModal;
