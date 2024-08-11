'use client';

import React from 'react';
import { useRouter } from 'next/router';
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/hooks/useAuth";
import useRouteLoading from '@/hooks/userouteloading';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loading = useRouteLoading();

  return (
    <AuthProvider>
      <Navbar />
      {loading && <Loading />}
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default Layout;
