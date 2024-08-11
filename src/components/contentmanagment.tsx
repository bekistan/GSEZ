'use client';
import React, { useState } from 'react';
import NewsManagement from './newsmanagment';
import ContactManagement from './contactmanagment';
import GalleryManagement from './gallerymanagment';
import MessagesManagement from './messagemanagment';
import FAQManagement from './faqmanagment';
import InvestorsComponent from './investorlist';

const ContentManagement: React.FC = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<string>('news');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Content Management</h2>
      {/* Tabs for different content types */}
      <div className="flex flex-wrap mb-4 space-x-2">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'news' ? 'bg-red-500 text-white' : 'bg-gray-900 text-gray-300'}`}
          onClick={() => setActiveTab('news')}
        >
          News
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'contact' ? 'bg-red-500 text-white' : 'bg-gray-900 text-gray-300'}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact us messages
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'gallery' ? 'bg-red-500 text-white' : 'bg-gray-900 text-gray-300'}`}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'messages' ? 'bg-red-500 text-white' : 'bg-gray-900 text-gray-300'}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'investors' ? 'bg-red-500 text-white' : 'bg-gray-900 text-gray-300'}`}
          onClick={() => setActiveTab('investors')}
        >
          Investment Managment
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'faq' ? 'bg-red-500 text-white' : 'bg-gray-900 text-gray-300'}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </div>
      {/* Render the appropriate content management component based on the active tab */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
        {activeTab === 'news' && <NewsManagement />}
        {activeTab === 'contact' && <ContactManagement />}
        {activeTab === 'gallery' && <GalleryManagement />}
        {activeTab === 'messages' && <MessagesManagement />}
        {activeTab === 'faq' && <FAQManagement />}
        {activeTab === 'investors' && <InvestorsComponent />}
      </div>
    </div>
  );
};

export default ContentManagement;
