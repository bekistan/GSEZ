'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import NoOutput from './nooutput';
import Loader from './loading';


const NewsPage: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollection = collection(db, 'news');
        const snapshot = await getDocs(newsCollection);
        const newsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
  
    fetchNews();
  }, []);

  const filteredNews = news.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) {
    return <>
    

    <Loader/>
    
    </>; // Display the loader component while loading
  }
  return (
    <>
    { (
    <div className="container mx-auto p-4 items-center flex flex-col">
      <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="pt-5 mt-10 text-3xl font-bold text-white-800 mb-6">NEWS</h2>
      <input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="text-black w-full px-3 py-2 mb-6 border border-gray-500 bg-gray-400 rounded-md"
      />
      {filteredNews.length === 0 ? (
        <NoOutput />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {filteredNews.map(news => (
            <div key={news.id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
              <Link href={`/news/${news.id}`}>
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 style={{ fontFamily: 'var(--font-merriweather)'}} className="text-xl font-bold text-gray-100 mb-2">{news.title}</h3>
                <p style={{ fontFamily: 'var(--font-poppins)'}} className="text-gray-300 mb-4">{news.summary}</p>
                <button style={{ fontFamily: 'var(--font-merriweather)'}} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
                  CONTINUE READING
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    )}
      </>
  );
};

export default NewsPage;
