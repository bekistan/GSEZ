'use client'
import About from '@/components/abouth'
import BlogSection from '@/components/blogsection'
import ChatWidget from '@/components/chatwidget'
import CompanySlider from '@/components/companyslider'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import TestimonialsSlider from '@/components/testimonals'
import { IncomingCallProvider } from '@/context/incomingcall'
import { AuthProvider } from '@/hooks/useAuth'
import React, { useState, useEffect } from 'react'
import { Pacifico,Lobster,Roboto,Dancing_Script,Merriweather ,Poppins} from 'next/font/google'
import Loader from '@/components/loading'


const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
});

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
});
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});
function Page() {
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
      {/* Conditional rendering of Loader */}
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-gray-800'>
          <Navbar />
          <Hero />
          <TestimonialsSlider />
          <BlogSection />
          <About />
          <FAQ />
          <ChatWidget />
          <CompanySlider />
          <Footer />
          <style jsx global>{`
        :root {
          --font-pacifico: ${pacifico.style.fontFamily};
          --font-lobster: ${lobster.style.fontFamily};
          --font-dancingScript: ${dancingScript.style.fontFamily};
          --font-roboto: ${roboto.style.fontFamily};
          --font-merriweather: ${merriweather.style.fontFamily};
          --font-poppins: ${poppins.style.fontFamily};
          
        }
      `}</style>
        </div>
      )}

    </AuthProvider>
  );
}

export default Page;
