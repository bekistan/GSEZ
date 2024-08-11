// src/components/MediaGallery.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './loading';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
}

const imagesPerPage = 20; // 5 rows * 6 columns

const MediaGallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isloading,setIsLoading]=useState(true);
  useEffect(() => {
    const fetchGallery = async () => {
      const galleryCollection = collection(db, 'gallery');
      const gallerySnapshot = await getDocs(galleryCollection);
      const galleryData = gallerySnapshot.docs.map((doc) => ({
        id: doc.id,
        src: doc.data().url,
        alt: doc.data().name,
      } as GalleryItem));
      setGallery(galleryData);
    };
    fetchGallery();
setIsLoading(false);
  }, []);

  const totalPages = Math.ceil(gallery.length / imagesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const startIndex = (currentPage - 1) * imagesPerPage;
  const selectedImages = gallery.slice(startIndex, startIndex + imagesPerPage);

  if(isloading){
    return<>
    <Loading/>
    </>
  }
  return (
    <div className="container mx-auto pt-14 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Media Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selectedImages.map((image) => (
          <div
            key={image.id}
            className="w-full h-64 bg-gray-200 flex items-center justify-center cursor-pointer"
            onClick={() => handleImageClick(image.src)}
          >
            <img src={image.src} alt={image.alt} className="object-cover h-full w-full" />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 font-bold text-white bg-red-500 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 font-bold text-white bg-red-500 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
        >
          Next
        </button>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative p-0 bg-white rounded-lg">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl font-bold bg-transparent-500 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img src={selectedImage} alt="Full Size" className="max-w-full max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
