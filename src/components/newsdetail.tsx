'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loader from './loading';

interface NewsDetailProps {
  id: string | string[] | undefined;
}

interface NewsItem {
  id: number;
  title: string;
  image: string;
  paragraphs: string[];
  relatedTopics: string[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ id }) => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        if (!id) return;
        const newsDoc = doc(db, 'news', id as string); // Replace 'news' with your collection name
        const docSnapshot = await getDoc(newsDoc);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const detailedNewsItem: NewsItem = {
            id: data.id,
            title: data.title,
            image: data.image,
            paragraphs: data.paragraphs,
            relatedTopics: data.relatedTopics,
          };
          setNewsItem(detailedNewsItem);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return <Loader />; // Display the loader component while loading
  }

  if (!id || !newsItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" pt-14  mx-auto p-4">
      <div className='bg-gray-900 p-5 rounded-lg'>

      <h2 className="pt-5 text-3xl font-bold text-white-800 mb-6">{newsItem.title}</h2>
      <img src={newsItem.image} alt={newsItem.title} className="w-full h-80 object-cover rounded-md mb-6" />
      {newsItem.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-gray-300 mb-4">{paragraph}</p>
        ))}
      <h3 className="text-2xl font-bold text-gray-300 mb-4">Comments</h3>
      <form className="mb-6">
        <textarea
          placeholder="Write your comment..."
          rows={4}
          className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
          ></textarea>
        <button type="submit" className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
          Post Comment
        </button>
      </form>
          </div>
    </div>
  );
};

export default NewsDetail;
