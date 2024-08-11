// components/GalleryManagement.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';

interface GalleryItem {
  id?: string;
  name: string;
  url: string;
  description: string;
}

const GalleryManagement: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [formData, setFormData] = useState<Omit<GalleryItem, 'id'>>({ name: '', url: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const galleryCollection = collection(db, 'gallery');
      const gallerySnapshot = await getDocs(galleryCollection);
      const galleryData = gallerySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as GalleryItem) }));
      setGallery(galleryData);
    };
    fetchGallery();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const addGalleryItem = async () => {
    if (!imageFile) return;

    const imageUrl = await uploadImage(imageFile);
    const newItem = { ...formData, url: imageUrl };
    const docRef = await addDoc(collection(db, 'gallery'), newItem);
    setGallery([...gallery, { id: docRef.id, ...newItem }]);
    setFormData({ name: '', url: '', description: '' });
    setImageFile(null);
  };

  const editGalleryItem = (id: string) => {
    setSelectedItemId(id);
    const selectedItem = gallery.find((item) => item.id === id);
    if (selectedItem) {
      setFormData({ name: selectedItem.name, url: selectedItem.url, description: selectedItem.description });
    }
  };

  const updateGalleryItem = async () => {
    if (selectedItemId === null) return;

    let imageUrl = formData.url;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    const updatedItem = { ...formData, url: imageUrl };
    await updateDoc(doc(db, 'gallery', selectedItemId), updatedItem as any);
    setGallery((prevGallery) =>
      prevGallery.map((item) =>
        item.id === selectedItemId ? { id: selectedItemId, ...updatedItem } : item
      )
    );
    setSelectedItemId(null);
    setFormData({ name: '', url: '', description: '' });
    setImageFile(null);
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
    setGallery(gallery.filter((item) => item.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGallery = gallery.filter(
    (item) =>
      (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
  );

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl text-center font-bold mb-6 text-white">Gallery Management</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search gallery items..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-700 text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 bg-gray-300">Name</th>
                <th className="p-2 bg-gray-300">Image</th>
                <th className="p-2 bg-gray-300">Description</th>
                <th className="p-2 bg-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGallery.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">
                    <img src={item.url} alt={item.name} className="w-24 h-24 object-cover" />
                  </td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => editGalleryItem(item.id!)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGalleryItem(item.id!)}
                      className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl text-center font-bold mb-6 text-white">Manage Image</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Gallery item name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="mt-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full bg-gray-700 text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          ></textarea>
        </div>
        <button
          onClick={selectedItemId !== null ? updateGalleryItem : addGalleryItem}
          className="mt-4 w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
        >
          {selectedItemId !== null ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </div>
  );
};

export default GalleryManagement;
