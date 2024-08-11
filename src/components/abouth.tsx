// src/components/About.tsx
'use client'
import Link from 'next/link';
import React from 'react';

const About: React.FC = () => {
  return (
    <div className=" mx-auto bg-gray-900 mb-8 p-14">
      <h2 style={{ fontFamily: 'var(--font-merriweather)'}} className="text-5xl pt-5 font-bold text-gray-50 mb-8">ABOUT US</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="lg:order-2 mt-0 pt-0">
          <div className="aspect-w-16 aspect-h-14">
          <iframe
              className=" top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/tnO3SJ7XlNk"
              title="The biggest economy zone in Africa. GADAA INDUSTRIAL CITY started in Oromia."
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Left Column: YouTube Video */}
        {/* Right Column: Title and Paragraph */}
        <div style={{ fontFamily: 'var(--font-poppins)'}} className="lg:order-1">
          
          <p className="text-lg text-gray-200 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
            ante dapibus diam. Sed nisi.
          </p>
          <p className="text-lg text-gray-200 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
            ante dapibus diam. Sed nisi.
          </p>
          <Link style={{ fontFamily: 'var(--font-merriweather)'}} href="/about">
            <button className="
            px-8 py-4 
            bg-gradient-to-r from-red-400 via-red-500 to-red-800 
            text-white font-bold 
            rounded-lg shadow-lg 
            transform transition-transform duration-300 
            hover:scale-105 hover:shadow-2xl 
            focus:outline-none">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
