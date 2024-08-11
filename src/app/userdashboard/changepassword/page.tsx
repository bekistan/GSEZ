import ChangePassword from '@/components/changepassword'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { AuthProvider } from '@/hooks/useAuth'
import React from 'react'

function page() {
  return (
    <AuthProvider>

    <div>
        <Navbar></Navbar>
        <ChangePassword/>
        <Footer/>
    </div>
    </AuthProvider>
  )
}

export default  page
