import React, { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/hooks/useAuth';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
}

const ContactManagement: React.FC = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchContacts = async () => {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        const contactsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[];
        setContacts(contactsList);
      };

      fetchContacts();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (user) {
      if (selectedContactId) {
        const contactRef = doc(db, 'contacts', selectedContactId);
        await updateDoc(contactRef, formData);
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === selectedContactId ? { ...contact, ...formData } : contact
          )
        );
        setSelectedContactId(null);
      } else {
        const docRef = await addDoc(collection(db, 'contacts'), formData);
        setContacts([...contacts, { id: docRef.id, ...formData }]);
      }

      setFormData({ name: '', email: '', message: '' });
    }
  };

  const editContact = (id: string) => {
    setSelectedContactId(id);
    const selectedContact = contacts.find((contact) => contact.id === id);
    if (selectedContact) {
      setFormData({ name: selectedContact.name, email: selectedContact.email, message: selectedContact.message });
    }
  };

  const deleteContact = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, 'contacts', id));
      setContacts(contacts.filter((contact) => contact.id !== id));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <div>Please log in to manage contacts.</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl text-gray-300 text-center font-bold mb-6">CONTACT MANAGEMENT</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-700 text-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-gray-700 bg-gray-200">Name</th>
                <th className="p-2 text-gray-700 bg-gray-200">Email</th>
                <th className="p-2 text-gray-700 bg-gray-200">Message</th>
                <th className="p-2 text-gray-700 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="p-2 text-gray-300 border">{contact.name}</td>
                  <td className="p-2 text-gray-300 border">{contact.email}</td>
                  <td className="p-2 text-gray-300 border">{contact.message}</td>
                  <td className="p-2 text-gray-300 border flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => editContact(contact.id)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id)}
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
      <div className="bg-gray-900 mt-5 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl text-gray-300 text-center font-bold mb-6">MANAGE CONTACT</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full text-gray-300 px-3 py-2 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full text-gray-300 px-3 py-2 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full text-gray-300 px-3 py-2 border border-gray-300 bg-gray-700 rounded-md focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
        >
          {selectedContactId !== null ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
    </div>
  );
};

export default ContactManagement;
