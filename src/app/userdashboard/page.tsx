'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProtectedRoute from '@/components/protectedroute';
import { AuthProvider } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';
import InvestPaypal from '@/components/investpaypal';
import { IncomingCallProvider } from '@/context/incomingcall';
import IncomingCallModal from '@/components/modal';
import { PeerProvider } from '@/context/peercontext';
import VideoChat from '@/components/videochat';
import Loader from '@/components/loading'
import InvestorsComponent from '@/components/investorlist';
const DynamicUserDashboard = dynamic(() => import('@/components/userdashboard'), { ssr: false });

function Dashboard() {
  const [loading, setLoading] = useState(true);
  

  // Simulating a delay of 2 seconds for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
 
  return (
    <AuthProvider>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-gray-800'>
          <Navbar />
          <ProtectedRoute>
            <DynamicUserDashboard />
            <InvestPaypal />
            
          </ProtectedRoute>
          <Footer />

        </div>
      )}
      
    </AuthProvider>
  );
}

export default Dashboard;
