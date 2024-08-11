// components/BlogPost.tsx
import React from 'react';
import Link from 'next/link';

interface BlogPostProps {
  image: string;
  title: string;
  paragraphs: string[];
  link: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ image, title, paragraphs, link }) => {
  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-gray-900 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 fade-in-up">
      <div className="overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition duration-500 transform hover:scale-110"
        />
      </div>
      <h2 style={{ fontFamily: 'var(--font-merriweather)'}}  className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 hover:text-red-600 transition duration-300">{title}</h2>
      <div style={{ fontFamily: 'var(--font-poppins)'}}  className="mt-4 space-y-4">
        {paragraphs.slice(0, 2).map((paragraph, index) => (  // Only display the first 2 paragraphs
          <p key={index} className="hover:text-red-500 text-gray-300 leading-relaxed text-base md:text-lg lg:text-xl">
            {paragraph}
          </p>
        ))}
      </div>
      <Link href={link}>
        <button className="mt-4 inline-block text-light-grey hover:text-red-600 text-base md:text-lg font-bold transition duration-300">
          Continue Reading &rarr;
        </button>
      </Link>
    </div>
  );
};

export default BlogPost;

