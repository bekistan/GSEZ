// pages/vr-video.tsx
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '@/components/Layout';

const VRVideoScene = dynamic(() => import('@/components/vrvideo'), { ssr: false });

const VRVideoPage: React.FC = () => {
  return (
   <Layout>
    <VRVideoScene></VRVideoScene>
   </Layout>
  );
};

export default VRVideoPage;
