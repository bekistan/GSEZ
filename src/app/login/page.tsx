'use client'
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NewsPage from "@/components/news";
import { AuthProvider } from "@/hooks/useAuth";
import { useEffect,useState } from "react";


import { Pacifico,Lobster,Roboto,Dancing_Script,Merriweather ,Poppins} from 'next/font/google'
import SignIn from "@/components/signin";
import Loading from "@/components/loading";


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

const Login = () => {
  const [loading, setLoading] = useState(true);

  // Simulating a delay of 2 seconds for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return <AuthProvider>
  <div className="bg-gray-600">

    {loading ? (
      <Loading />
      ) : (
        <div className="bg-gray-600">
    <Navbar/>

        <SignIn/>
      <Footer/>
    </div>
)}
</div>

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
      </AuthProvider>
  
};

export default Login;
