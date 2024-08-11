'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

// Dark mode styling
const darkModeStyles = {
  backgroundColor: '#fffff',
  color: '#1a1a1a',
};

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Testimonial {
  message: string;
  author: string;
  position: string;
  title: string;
}

const TestimonialsSlider: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialsCollection = collection(db, 'messages');
      const testimonialsSnapshot = await getDocs(testimonialsCollection);
      const testimonialsData = testimonialsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          message: data.detail,
          author: data.author,
          position: data.position,
          title: data.title,
        };
      }) as Testimonial[];
      setTestimonials(testimonialsData);
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="relative bg-gray-900 text-white py-10 px-4 md:px-10" style={darkModeStyles}>
      <h1 style={{ fontFamily: 'var(--font-merriweather)'}}  className="text-5xl font-bold text-light-grey mb-4 text-center">MESSAGES</h1>

      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        loop={true}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="flex justify-center items-center"
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <div style={{ fontFamily: 'var(--font-poppins)'}}  className="container bg-transparent text-white p-6 md:p-10 rounded-lg shadow-lg text-center mx-4">
                <p className="text-lg text-white-900 mb-4">"{testimonial.title}"</p>
                <p className="text-md text-white-700 mb-4">"{testimonial.message}"</p>
                <p className="text-sm text-white-600 mb-4">- {testimonial.author}</p>
                <p className="text-sm text-white-600 mb-4">- {testimonial.position}</p>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

export default TestimonialsSlider;
