// src/components/CompanySlider.tsx
'use client'
import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Replace these logo URLs with your actual company logo images
const companyLogos = [
  { src: 'https://www.gadasez.gov.et/wp-content/uploads/2021/06/mofed-150x150.png', alt: 'Company 1' },
  { src: 'https://www.gadasez.gov.et/wp-content/uploads/2021/06/download-wpp1622966286972-150x150.png', alt: 'Company 2' },
  { src: 'https://www.gadasez.gov.et/wp-content/uploads/2021/06/logo_new-1-wpp1623055653484-150x150.png', alt: 'Company 3' },
  { src: 'https://www.gadasez.gov.et/wp-content/uploads/2021/06/MFA-wpp1623056150272-150x150.jpg', alt: 'Company 4' },
  { src: 'https://www.gadasez.gov.et/wp-content/uploads/2021/06/opo-wpp1623056700937-150x150.jpg', alt: 'Company 5' },
  { src: 'https://www.gadasez.gov.et/wp-content/uploads/2021/06/RBafaoMW_400x400-150x150.jpg', alt: 'Company 5' },
 
 
];

const CompanySlider: React.FC = () => {
  return (
    <div className="bg-gray-800 mx-auto p-4">
      <h2 className="pb-5 text-3xl font-bold text-gray-300 mb-6 text-center">OUR PARTNERS</h2>
      <Swiper
        modules={[ Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        
        pagination={{ clickable: true }}
       
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
        }}
      >
        {companyLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center h-full mb-9 pb-5">
              <img src={logo.src} alt={logo.alt} className="max-h-24 " />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CompanySlider;
