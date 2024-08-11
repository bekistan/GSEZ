import ContentManagement from '@/components/contentmanagment'
import DashboardOverview from '@/components/dashboardoverview'
import Footer from '@/components/footer'
import InvestorForm from '@/components/investorform'
import InvestorsComponent from '@/components/investorlist'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import UserManagement from '@/components/usermanagment'
import { AuthProvider } from '@/hooks/useAuth'
import React from 'react'
import useNavigationLoading from '@/hooks/usenavigationloading'

function page() {
  
  
  return (
    <AuthProvider>
      <div className='bg-gray-600'>

          <Navbar/> 
        <DashboardOverview />
        <UserManagement />
        <ContentManagement />
        
        <Footer/>
      </div>
    </AuthProvider>
  )
}

export default page