'use client';
import React from 'react';
import { IncomingCallProvider } from '@/context/incomingcall';
import { OutgoingCallProvider } from '@/context/outgoingcall';
import VideoChat from '@/components/videochat';

const VideoChatWrapper: React.FC = () => {
  return (
    <IncomingCallProvider>
      <OutgoingCallProvider>
        <VideoChat />
      </OutgoingCallProvider>
    </IncomingCallProvider>
  );
};

export default VideoChatWrapper;
