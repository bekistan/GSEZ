'use client'
import DonationForm from '@/components/donationform'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { AuthProvider } from '@/hooks/useAuth'
import React from 'react'
import { useEffect,useState } from 'react'
import Loading from '@/components/loading'
import useNavigationLoading from '@/hooks/usenavigationloading'
function page() {
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
      <div className="bg-gray-800">

        {loading ? (
          <Loading />
          
          )
           : (
        <div className="bg-gray-800">

        <Navbar/>
            <DonationForm/>
          <Footer/>
        </div>
  )}
  </div>
  </AuthProvider>
)}

export default page