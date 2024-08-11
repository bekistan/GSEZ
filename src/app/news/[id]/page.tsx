// src/pages/news/[id].tsx
'use client';
import { useEffect,useState } from 'react';
import { useParams } from 'next/navigation';
import NewsDetail from '@/components/newsdetail';
import Navbar from '@/components/navbar';
import { AuthProvider } from '@/hooks/useAuth';
import Footer from '@/components/footer';
import useNavigationLoading from '@/hooks/usenavigationloading';
import Loading from '@/components/loading';
const NewsDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Simulating a delay of 2 seconds for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return<>
      <Loading/>
    </>
    
  }

  return <AuthProvider>
      <div className="bg-gray-600">
  <Navbar/>
  <NewsDetail id={id} />
  <Footer/>
  </div>
  </AuthProvider>
  
};

export default NewsDetailPage;
