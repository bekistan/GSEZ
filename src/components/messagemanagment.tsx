// src/components/MessagesManagement.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase'; // Ensure you have Firebase configured correctly

interface Message {
  id: string;
  author: string;
  title: string;
  detail: string;
  position: string;
}

const MessagesManagement: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesCollection = collection(db, 'messages');
      const messagesSnapshot = await getDocs(messagesCollection);
      const messagesData = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(messagesData);
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id: string) => {
    await deleteDoc(doc(db, 'messages', id));
    setMessages(messages.filter(message => message.id !== id));
  };

  const addMessage = () => {
    const newMessage = { id: '', author: '', title: '', detail: '', position: '' };
    setSelectedMessage(newMessage);
  };

  const saveMessage = async () => {
    if (selectedMessage) {
      if (selectedMessage.id) {
        const messageDoc = doc(db, 'messages', selectedMessage.id);
        await updateDoc(messageDoc, { ...selectedMessage });
        setMessages(messages.map(message => message.id === selectedMessage.id ? selectedMessage : message));
      } else {
        const messagesCollection = collection(db, 'messages');
        const docRef = await addDoc(messagesCollection, selectedMessage);
        setMessages([...messages, { ...selectedMessage, id: docRef.id }]);
      }
      setSelectedMessage(null);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-md">
      <h2 className="text-3xl text-center font-bold mb-6">Message Management</h2>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mr-4 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={addMessage}
          className="bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
        >
          Add Message
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {messages
          .filter(message =>
            message.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.position.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(message => (
            <div key={message.id} className="bg-gray-600 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-200 mb-2">{message.title}</h3>
              <p className="text-gray-300 ">Author: {message.author}</p>
              <p className="text-gray-300 ">Position: {message.position}</p>
              <p className="text-gray-300 ">{message.detail}</p>
              <div className="flex mt-2">
                <button
                  onClick={() => setSelectedMessage(message)}
                  className="w-full bg-gray-900 text-white font-bold py-1 px-2 rounded mr-2 hover:bg-gray-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="w-full bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {selectedMessage && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Edit Message</h2>
          <input
            type="text"
            placeholder="Author"
            value={selectedMessage.author}
            onChange={(e) => setSelectedMessage({ ...selectedMessage, author: e.target.value })}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Title"
            value={selectedMessage.title}
            onChange={(e) => setSelectedMessage({ ...selectedMessage, title: e.target.value })}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Position"
            value={selectedMessage.position}
            onChange={(e) => setSelectedMessage({ ...selectedMessage, position: e.target.value })}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-indigo-500"
          />
          <textarea
            placeholder="Detail"
            value={selectedMessage.detail}
            onChange={(e) => setSelectedMessage({ ...selectedMessage, detail: e.target.value })}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-indigo-500"
            rows={4}
          ></textarea>
          <button
            onClick={saveMessage}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default MessagesManagement;
