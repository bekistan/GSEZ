// src/components/ContactUs.tsx
'use client'

import { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      setSuccessMessage('Message sent successfully!');
      setErrorMessage(null);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-600  text-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-gray-900 mt-5  p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Get in Touch</h2>
            <p className="text-gray-300 text-lg mb-4">
              Have any questions? We'd love to hear from you. Reach out to us using the form below, or connect with us on social media.
            </p>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-gray-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-gray-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-md text-gray-100"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Visit Us</h2>
            <div className="w-full h-64 mb-4">
             <iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7942.506135164366!2d39.25258726869155!3d8.63824922379685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1692716613059!5m2!1sen!2sus"
  width="100%"
  height="100%"
  allowFullScreen={false}
  loading="lazy"
  className="rounded-md shadow-lg"
></iframe>

            </div>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Connect with Us</h2>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/gadasez/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition duration-300">
                <FaFacebook size={32} />
              </a>
              <a href="https://www.facebook.com/gadasez/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition duration-300">
                <FaTwitter size={32} />
              </a>
            
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition duration-300">
                <FaInstagram size={32} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Office Address</h2>
            <p className="text-gray-300 text-lg">
              Melka Adama sub city,<br />
              Adama, Oromia, 1000<br />
              Ethiopia
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Contact Information</h2>
            <p className="text-gray-300 text-lg mb-1">
              <strong>Email:</strong> gsez9917@gmail.com
            </p>
            <p className="text-gray-300 text-lg">
              <strong>Phone:</strong> +251933980130
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
