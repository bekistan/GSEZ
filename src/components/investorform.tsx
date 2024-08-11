'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import Loader from './loading';
import { useAuth } from '@/hooks/useAuth'; // Import the authentication hook
import Link from 'next/link';

const InvestorForm: React.FC = () => {
  const { user, loading: authLoading } = useAuth(); 
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    investmentAmount: '',
    investmentType: '',
    location: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before submitting
  
    try {
      await addDoc(collection(db, 'investors'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      console.log('Form submitted successfully');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        investmentAmount: '',
        investmentType: '',
        location: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false); 
    }
  };
  
  if (loading || authLoading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-600 p-5 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6 mt-10">Access Restricted</h2>
        <p className="text-lg mb-6">Please log in to access the form.</p>
        <Link href='/login'>
        <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300">
          Log In
        </button>
        </Link>
      </div>
    </div>
    
    );
  }

  return (
    <div className=' bg-gray-800 pt-14 pb-5 '>

    <div className='bg-gray-900  text-gray-400 pt-10 container'   style={{  margin: '0 auto', padding: '20px', border: '1px solid #333', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: '#fff' }}>Investor Form</h2>
      <form style={{ marginBottom: '20px' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>First Name:</label>
          <input type="text" className='bg-gray-500' name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: 'black' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', }}>Last Name:</label>
          <input type="text" className='bg-gray-500'  name="lastName" value={formData.lastName} onChange={handleChange}  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: '#fff' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className='bg-gray-500'  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: '#fff' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number:</label>
          <input type="tel" className='bg-gray-500'  name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: '#fff' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Investment Amount:</label>
          <input type="number" className='bg-gray-500' name="investmentAmount" value={formData.investmentAmount} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: '#fff' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Investment Type:</label>
          <select className='bg-gray-500' name="investmentType" value={formData.investmentType} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', appearance: 'none' }} required>
            <option className='bg-gray-500 text-white' value="">Select</option>
            <option className='bg-gray-500 text-white' value="Stocks">Stocks</option>
            <option className='bg-gray-500 text-white' value="Bonds">Bonds</option>
            <option className='bg-gray-500 text-white' value="Real Estate">Real Estate</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Location:</label>
          <input type="text" className='bg-gray-500' name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: '#fff' }} required />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message:</label>
          <textarea className='bg-gray-500' name="message" value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', color: '#fff' }}></textarea>
        </div>
        <button type="submit"  style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>INVEST</button>
      </form>
    </div>
    </div>
  );
};

export default InvestorForm;
