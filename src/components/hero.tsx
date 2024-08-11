// src/components/Hero.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './navbar';
import { Typewriter } from 'react-simple-typewriter';

const Hero: React.FC = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const subtitleDelay = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500); // Delay before showing subtitle

    return () => clearTimeout(subtitleDelay);
  }, []);

  return (
    <div className="relative h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/GSEZ FTZ(Free Trade Zone) 3D Simulation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4" style={{ fontFamily: 'var(--font-merriweather)'}}>
          <span>
            <Typewriter
              words={['Welcome to ']}
              typeSpeed={100}
              
              
            />
            <span className="text-red-500">
              <Typewriter
                words={['GSEZ']}
                typeSpeed={100}
               
                
              />
            </span>
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8" style={{ fontFamily: 'var(--font-poppins)'}}>
          {showSubtitle && (
            <Typewriter
              words={['We are glad to have you here. Explore and enjoy our services.']}
              typeSpeed={50}
              
             
            />
          )}
        </p>
        <Link href="/visit" style={{ fontFamily: 'var(--font-merriweather)'}}>
          <button 
           className="
           px-8 py-4 
           bg-gradient-to-r from-red-400 via-red-500 to-red-800 
           text-white font-bold 
           rounded-lg shadow-lg 
           transform transition-transform duration-300 
           hover:scale-105 hover:shadow-2xl 
           
           focus:outline-none
           "
       >
          WALK WITH US
          </button>
        </Link>
      </div>
      
    </div>
  );
};

export default Hero;
