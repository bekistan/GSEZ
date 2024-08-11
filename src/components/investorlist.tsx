'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { collection, getDocs, addDoc, serverTimestamp, Timestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './loading';
import { useAuth } from '@/hooks/useAuth';

interface Investor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  investmentAmount: string;
  investmentType: string;
  location: string;
  message: string;
  status: string;
  createdAt: Timestamp;
}

const InvestorsComponent: React.FC = () => {
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
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [investorsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingInvestorId, setEditingInvestorId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // Assuming you have access to user ID
  const {user}=useAuth();
  
  useEffect(() => {
    // Ensure user is defined before accessing its properties
    if (user && user.uid === 'FbHAh6SYSucDerqq2fR1GRldFHK2') {
      setUserId('FbHAh6SYSucDerqq2fR1GRldFHK2');
    } else {
      setUserId(null); // Set userId to null if the user is not matched or undefined
    }
  }, [user]); // Ensure useEffect runs whenever user changes

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingInvestorId) {
      try {
        const investorRef = doc(db, 'investors', editingInvestorId);
        await updateDoc(investorRef, {
          ...formData
        });
        console.log('Investor updated successfully');
        setEditingInvestorId(null);
      } catch (error) {
        console.error('Error updating investor:', error);
      }
    } else {
      try {
        await addDoc(collection(db, 'investors'), {
          ...formData,
          status: 'pending',
          createdAt: serverTimestamp()
        });
        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }

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
    fetchInvestors();
  };

  const fetchInvestors = async () => {
    try {
      const investorsCollection = collection(db, 'investors');
      const investorsSnapshot = await getDocs(investorsCollection);
      const investorsList = investorsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          investmentAmount: data.investmentAmount,
          investmentType: data.investmentType,
          location: data.location,
          message: data.message,
          status: data.status,
          createdAt: data.createdAt
        } as Investor;
      });
      setInvestors(investorsList);
    } catch (error) {
      console.error('Error fetching investors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  const indexOfLastInvestor = currentPage * investorsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - investorsPerPage;
  const currentInvestors = investors.slice(indexOfFirstInvestor, indexOfLastInvestor);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredInvestors = investors.filter(investor =>
      investor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.phoneNumber.includes(searchTerm) ||
      investor.investmentType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setInvestors(filteredInvestors);
  };

  const handleApprove = async (id: string) => {
    try {
      const investorRef = doc(db, 'investors', id);
      await updateDoc(investorRef, {
        status: 'approved'
      });
      console.log('Investor approved:', id);
      fetchInvestors();
    } catch (error) {
      console.error('Error approving investor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'investors', id));
      console.log('Investor deleted:', id);
      fetchInvestors();
    } catch (error) {
      console.error('Error deleting investor:', error);
    }
  };

  const handleEdit = (investor: Investor) => {
    setFormData({
      firstName: investor.firstName,
      lastName: investor.lastName,
      email: investor.email,
      phoneNumber: investor.phoneNumber,
      investmentAmount: investor.investmentAmount,
      investmentType: investor.investmentType,
      location: investor.location,
      message: investor.message
    });
    setEditingInvestorId(investor.id);
  };

  // If user ID matches, do not render the component
  if (userId === 'FbHAh6SYSucDerqq2fR1GRldFHK2') {
    return    <div className=" ">
  <div className="mt-5 text-gray-300 rounded-lg p-6 shadow-md m-3 bg-gray-900">
    <form onSubmit={handleSearch} className="mb-4 mt-4 flex items-center space-x-3">
      <input 
        type="text" 
        placeholder="Search Investors..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="px-3 py-2 bg-gray-900 border border-gray-400 rounded w-full" 
      />
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>


    <div className='overflow-x-auto'>

    <table className="w-full col-md  mt-5">
      <thead>
        <tr>
          <th className="p-2 text-gray-700 bg-gray-400">First Name</th>
          <th className="p-2 text-gray-700 bg-gray-400">Last Name</th>
          <th className="p-2 text-gray-700 bg-gray-400">Email</th>
          <th className="p-2 text-gray-700 bg-gray-400">Phone Number</th>
          <th className="p-2 text-gray-700 bg-gray-400">Investment Amount</th>
          <th className="p-2 text-gray-700 bg-gray-400">Investment Type</th>
          <th className="p-2 text-gray-700 bg-gray-400">Location</th>
          <th className="p-2 text-gray-700 bg-gray-400">Status</th>
          <th className="p-2 text-gray-700 bg-gray-400">Created At</th>
          <th className="p-2 text-gray-700 bg-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentInvestors.map((investor) => (
          <tr key={investor.id} className="hover:bg-gray-500 hover:text-black">
            <td className="p-2 border">{investor.firstName}</td>
            <td className="p-2 border">{investor.lastName}</td>
            <td className="p-2 border">{investor.email}</td>
            <td className="p-2 border">{investor.phoneNumber}</td>
            <td className="p-2 border">{investor.investmentAmount}</td>
            <td className="p-2 border">{investor.investmentType}</td>
            <td className="p-2 border">{investor.location}</td>
            <td className="p-2 border">{investor.status}</td>
            <td className="p-2 border">{investor.createdAt.toDate().toLocaleDateString()}</td>
            <td className="p-2 border flex space-x-2">
              {investor.status === 'pending' && (
                <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => handleApprove(investor.id)}>Approve</button>
              )}
              <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => handleEdit(investor)}>Edit</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(investor.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
                </div>
    {/* Pagination */}
    <div className="mt-5 flex justify-center space-x-2">
      {Array.from({ length: Math.ceil(investors.length / investorsPerPage) }).map((_, index) => (
        <button key={index} onClick={() => paginate(index + 1)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">{index + 1}</button>
      ))}
    </div>
  </div>
</div>;
  }

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <div className=" ">
        <div  className="bg-gray-900 rounded-lg p-6 shadow-md m-3  ">
        <h2 className="text-xl mb-4">Investor List</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input className='w-full p-2 border bg-gray-600 border-gray-300 rounded' type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input className='w-full p-2 border bg-gray-600 border-gray-300 rounded' type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          <input className='w-full p-2 border bg-gray-600 border-gray-300 rounded' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input className='w-full p-2 border bg-gray-600 border-gray-300 rounded' type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
          <input className='w-full p-2 border bg-gray-600 border-gray-300 rounded' type="text" name="investmentAmount" value={formData.investmentAmount} onChange={handleChange} placeholder="Investment Amount" />
          <input className='w-full p-2 border bg-gray-600 border-gray-300 rounded' type="text" name="investmentType" value={formData.investmentType} onChange={handleChange} placeholder="Investment Type" />
          <input className='w-full p-2 border bg-gray-600 border-gray-300 rounded' type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <textarea className='w-full p-2 border bg-gray-600 border-gray-300 rounded' name="message" value={formData.message} onChange={handleChange} placeholder="Message"></textarea>
          <button className='w-full p-2 bg-red-600 text-white rounded hover:bg-red-700' type="submit">{editingInvestorId ? 'Update' : 'Submit'}</button>
        </form>
        </div>
      <div className="mt-5 text-gray-300 rounded-lg p-6 shadow-md m-3 bg-gray-900">
        <form onSubmit={handleSearch} className="mb-4 mt-4 flex items-center space-x-3">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="px-3 py-2 bg-gray-900 border border-gray-400 rounded w-full" 
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>


        <div className='overflow-x-auto'>

        <table className="w-full col-md  mt-5">
          <thead>
            <tr>
              <th className="p-2 text-gray-700 bg-gray-400">First Name</th>
              <th className="p-2 text-gray-700 bg-gray-400">Last Name</th>
              <th className="p-2 text-gray-700 bg-gray-400">Email</th>
              <th className="p-2 text-gray-700 bg-gray-400">Phone Number</th>
              <th className="p-2 text-gray-700 bg-gray-400">Investment Amount</th>
              <th className="p-2 text-gray-700 bg-gray-400">Investment Type</th>
              <th className="p-2 text-gray-700 bg-gray-400">Location</th>
              <th className="p-2 text-gray-700 bg-gray-400">Status</th>
              <th className="p-2 text-gray-700 bg-gray-400">Created At</th>
              <th className="p-2 text-gray-700 bg-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentInvestors.map((investor) => (
              <tr key={investor.id} className="hover:bg-gray-500 hover:text-black">
                <td className="p-2 border">{investor.firstName}</td>
                <td className="p-2 border">{investor.lastName}</td>
                <td className="p-2 border">{investor.email}</td>
                <td className="p-2 border">{investor.phoneNumber}</td>
                <td className="p-2 border">{investor.investmentAmount}</td>
                <td className="p-2 border">{investor.investmentType}</td>
                <td className="p-2 border">{investor.location}</td>
                <td className="p-2 border">{investor.status}</td>
                <td className="p-2 border">{investor.createdAt.toDate().toLocaleDateString()}</td>
                <td className="p-2 border flex space-x-2">
                  {investor.status === 'pending' && (
                    <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => handleApprove(investor.id)}>Approve</button>
                  )}
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => handleEdit(investor)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(investor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
                    </div>
        {/* Pagination */}
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(investors.length / investorsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">{index + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorsComponent;
