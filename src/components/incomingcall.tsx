// components/IncomingCallModal.tsx
import React from 'react';

interface IncomingCallProps {
  callerId: string;
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCallModal: React.FC<IncomingCallProps> = ({ callerId, onAccept, onDecline }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg text-center">
    <h2 className="text-2xl mb-4">Incoming Call</h2>
    <p className="mb-6">Incoming call from {callerId}</p>
    <button onClick={onAccept} className="bg-green-500 text-white px-4 py-2 rounded mr-4 hover:bg-green-700">
      Accept
    </button>
    <button onClick={onDecline} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
      Decline
    </button>
  </div>
);

export default IncomingCallModal;
