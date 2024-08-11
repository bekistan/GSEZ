import React from 'react';
import Footer from '@/components/footer';
import IncomingCallModal from '@/components/modal';
import Navbar from '@/components/navbar';
import VideoChat from '@/components/videochat';
import { IncomingCallProvider } from '@/context/incomingcall';
import { OutgoingCallProvider } from '@/context/outgoingcall';
import { PeerProvider } from '@/context/peercontext';
import { AuthProvider } from '@/hooks/useAuth';
import OutgoingCallModal from '@/components/outmodal';

function Page() {
  return (
    <AuthProvider>
      <PeerProvider>
        <OutgoingCallProvider>
          <IncomingCallProvider>
            <div className='bg-gray-800'>
              <Navbar />
              <VideoChat />
              <Footer />
              <IncomingCallModal />
              <OutgoingCallModal />
            </div>
          </IncomingCallProvider>
        </OutgoingCallProvider>
      </PeerProvider>
    </AuthProvider>
  );
}

export default Page;
