'use client';

import { db } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaNewspaper, FaCalendarAlt, FaImages, FaDonate } from 'react-icons/fa';

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [newsCount, setNewsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [contactMessagesCount, setContactMessagesCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [donationsCount, setDonationsCount] = useState(0);
  const [approvedInvestmentsCount, setApprovedInvestmentsCount] = useState(0);
  const [appliedInvestmentsCount, setAppliedInvestmentsCount] = useState(0);
  const [pendingInvestmentsCount, setPendingInvestmentsCount] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchCounts = async () => {
        try {
          const newsSnapshot = await getDocs(collection(db, 'news'));
          setNewsCount(newsSnapshot.size);

          const usersSnapshot = await getDocs(collection(db, 'users'));
          setUsersCount(usersSnapshot.size);

          const contactMessagesSnapshot = await getDocs(collection(db, 'contacts'));
          setContactMessagesCount(contactMessagesSnapshot.size);

          const gallerySnapshot = await getDocs(collection(db, 'gallery'));
          setGalleryCount(gallerySnapshot.size);

          const donationsSnapshot = await getDocs(collection(db, 'donation'));
          setDonationsCount(donationsSnapshot.size);


          const appliedInvestmentsSnapshot = await getDocs(collection(db, 'investors'));
          setAppliedInvestmentsCount(appliedInvestmentsSnapshot.size);
          
          const approvedInvestmentsSnapshot = await getDocs(query(collection(db, 'investors'), where('status', '==', 'approved')));
          setApprovedInvestmentsCount(approvedInvestmentsSnapshot.size);

          const pendingInvestmentsSnapshot = await getDocs(query(collection(db, 'investors'), where('status', '==', 'pending')));
          setPendingInvestmentsCount(pendingInvestmentsSnapshot.size);

        } catch (error) {
          console.error('Error fetching counts: ', error);
        }
      };

      fetchCounts();
    }
  }, [user]);

  return (
    <div className="p-4 pt-14">
      <h2 className="text-2xl pt-5 text-center font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaNewspaper className="text-4xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-lg text-gray-300 font-semibold mb-2">Total News</h3>
            <p className="text-gray-400">{newsCount}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaCalendarAlt className="text-4xl text-green-500 mr-4" />
          <div>
            <h3 className="text-lg text-gray-300 font-semibold mb-2">Total Contact Messages</h3>
            <p className="text-gray-400">{contactMessagesCount}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaImages className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Gallery</h3>
            <p className="text-gray-400">{galleryCount}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaDonate className="text-4xl text-red-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Users</h3>
            <p className="text-gray-400">{usersCount}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaDonate className="text-4xl text-red-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Donations</h3>
            <p className="text-gray-400">{donationsCount}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaDonate className="text-4xl text-red-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Applied Investments</h3>
            <p className="text-gray-400">{appliedInvestmentsCount}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaDonate className="text-4xl text-red-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Approved Investments</h3>
            <p className="text-gray-400">{approvedInvestmentsCount}</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 shadow-md flex items-center hover:bg-red-900">
          <FaDonate className="text-4xl text-red-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Pending Investments</h3>
            <p className="text-gray-400">{pendingInvestmentsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
