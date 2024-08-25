// context/peercontext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Peer from 'peerjs';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';

interface PeerProviderProps {
  children: ReactNode;
}

const PeerContext = createContext<Peer | null>(null);

// Singleton peer instance
let peerInstance: Peer | null = null;

export const PeerProvider: React.FC<PeerProviderProps> = ({ children }) => {
  const [peer, setPeer] = useState<Peer | null>(peerInstance);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || peer) return;

    // Connect to PeerJS Cloud Server
    const newPeer = new Peer({
      host: '0.peerjs.com',
      port: 443, // Use port 443 for HTTPS
      secure: true, // Enable HTTPS
      path: '/',
    });

    peerInstance = newPeer;
    setPeer(newPeer);

    newPeer.on('open', async (id) => {
      console.log('My peer ID is: ' + id);

      const userId = user.uid;
      try {
        const userDoc = doc(db, 'users', userId);
        await setDoc(userDoc, { peerId: id }, { merge: true });
      } catch (error) {
        console.error('Error saving peer ID to Firestore:', error);
      }
    });

    newPeer.on('error', (err) => {
      console.error('PeerJS error:', err);
    });

    return () => {
      // Do not destroy peer on unmount
    };
  }, [user, peer]);

  return <PeerContext.Provider value={peer}>{children}</PeerContext.Provider>;
};

export const usePeer = () => useContext(PeerContext);
