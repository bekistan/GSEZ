'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import { useAuth } from '@/hooks/useAuth';
import { firestore } from '@/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Loader from './loading';
import { FaMoneyBill, FaVideo, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Link from 'next/link';
import InvestorsComponent from './investorlist';

Modal.setAppElement('body');

const UserDashboard = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [investedAmount, setInvestedAmount] = useState(0);
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [isCeoActive, setIsCeoActive] = useState(false);
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    if (  !user) {
      router.push('/login');
    }

    const ceoDocRef = doc(firestore, 'users', 'FbHAh6SYSucDerqq2fR1GRldFHK2');
    const unsubscribe = onSnapshot(ceoDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setIsCeoActive(docSnapshot.data().isActive);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user, router]);

  const toggleCeoStatus = async () => {
    const ceoDocRef = doc(firestore, 'users', 'FbHAh6SYSucDerqq2fR1GRldFHK2');
    try {
      const newStatus = !isCeoActive;
      await updateDoc(ceoDocRef, { isActive: newStatus });
      setIsCeoActive(newStatus);
      if (newStatus) {
        window.open('/userdashboard/videochat', '_blank');
      }
    } catch (error) {
      console.error('Error updating CEO status:', error);
    }
  };

  

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mt-6 mb-6">
        <h1 className="text-3xl font-bold mt-10">User Dashboard</h1>
      </header>
      {user && (
        <div>
          {user.uid !== 'FbHAh6SYSucDerqq2fR1GRldFHK2' && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800">
                  <FaMoneyBill className="text-4xl text-red-500 mr-4" />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-merriweather)'}} className="text-lg font-semibold text-gray-500 mb-2">Total Invested Amount</h3>
                    <p style={{ fontFamily: 'var(--font-poppins)'}} className="text-gray-400">${investedAmount}</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800">
                  <FaMoneyBill className="text-4xl text-red-500 mr-4" />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-merriweather)'}} className="text-lg font-semibold text-gray-500 mb-2">Total Donation</h3>
                    <p style={{ fontFamily: 'var(--font-poppins)'}} className="text-gray-400">${donatedAmount}</p>
                  </div>
                </div>
                {isCeoActive ? (
                  <Link href="/userdashboard/videochat">
                    <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center cursor-pointer hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800">
                      <FaVideo className="text-4xl text-red-500 mr-4" />
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-merriweather)'}} className="text-lg font-semibold text-gray-500 mb-2">Call CEO Of GSEZ</h3>
                        <p style={{ fontFamily: 'var(--font-poppins)'}} className="text-gray-400">Video call Mr. Motumma to talk about investment</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div style={{ fontFamily: 'var(--font-merriweather)'}} className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center cursor-pointer hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800">
                    <FaVideo className="text-4xl text-red-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">The CEO Of GSEZ is not online</h3>
                      <p style={{ fontFamily: 'var(--font-poppins)'}} className="text-gray-400">Mr. Motumma is not online, please come back later</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {user.uid === 'FbHAh6SYSucDerqq2fR1GRldFHK2' && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800">
                  <FaMoneyBill className="text-4xl text-red-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Total Invested Amount</h3>
                    <p className="text-gray-400">${investedAmount}</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800">
                  <FaMoneyBill className="text-4xl text-red-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">Total Donation</h3>
                    <p className="text-gray-400">${donatedAmount}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 mt-4 bg-gray-900 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800">
                {isCeoActive ? (
                  <FaToggleOn
                    className="text-4xl text-green-500 mr-4"
                    onClick={toggleCeoStatus}
                  />
                ) : (
                  <FaToggleOff
                    className="text-4xl text-gray-500 mr-4"
                    onClick={toggleCeoStatus}
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">Change Availability Status</h3>
                  <p className="text-gray-400">
                    {isCeoActive ? 'Currently Active' : 'Currently Offline'}
                  </p>
                </div>
              </div>
              <InvestorsComponent/>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
