'use client'
import React, { useState, useEffect } from 'react';
import BlogPost from './blog';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<{ id: string; data: any }[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'news')); // Assuming 'news' is the collection name
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
      setBlogPosts(postsData);
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800">
      <h1 style={{ fontFamily: 'var(--font-merriweather)'}} className='text text-4xl text-center pt-9'>LATEST NEWS</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1} // Display one slide on small screens
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{ // Adjust slides per view for different screen sizes
          640: {
            slidesPerView: 2, // Display two slides on medium screens
          },
          768: {
            slidesPerView: 2, // Display three slides on large screens
          },
          1024: {
            slidesPerView: 2, // Display four slides on extra large screens
          },
        }}
      >
        {blogPosts.map(({ id, data }) => (
          <SwiperSlide key={id}>
            <BlogPost
              image={data.image}
              title={data.title}
              paragraphs={[data.summary]} // Pass the summary as an array to match the existing structure
              link={`/news/${id}`} // Use the document ID in the link
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSection;
