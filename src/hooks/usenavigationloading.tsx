import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useNavigationLoading = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  const navigate = async (url: string) => {
    setLoading(true);
    try {
      await router.push(url);
    } finally {
      setLoading(false);
    }
  };

  return { loading, navigate };
};

export default useNavigationLoading;
