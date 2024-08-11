// components/UserManagement.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { deleteDoc, getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/firebase';
import Modal from 'react-modal'; // Modal for edit form

interface User {
  id: string;
  fullname: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editUser, setEditUser] = useState<User | null>(null); // For editing
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUsers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'users'));
          const userList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            fullname: doc.data().fullname || '', // Default to an empty string if fullname is undefined
            email: doc.data().email || '', // Default to an empty string if email is undefined
          })) as User[];
          setUsers(userList);
        } catch (error) {
          console.error('Error fetching users: ', error);
        }
      };

      fetchUsers();
    }
  }, [user]);

  const deleteUser = async (id: string) => {
    if (user) {
      try {
        // Call API to delete user from Firebase Authentication
        await fetch(`../api/deleteUser?uid=${id}`, {
          method: 'DELETE',
        });

        // Delete user document from Firestore
        await deleteDoc(doc(db, 'users', id));

        // Update local state
        setUsers(users.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error deleting user: ', error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setModalIsOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editUser) {
      setEditUser({
        ...editUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveChanges = async () => {
    if (editUser) {
      try {
        const userRef = doc(db, 'users', editUser.id);
        await updateDoc(userRef, {
          fullname: editUser.fullname,
          email: editUser.email,
        });

        // Update local state
        setUsers(users.map(u => (u.id === editUser.id ? editUser : u)));
        setModalIsOpen(false);
      } catch (error) {
        console.error('Error saving user changes: ', error);
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center text-gray-300 font-semibold mb-4">User Management</h2>
      <div className="bg-gray-900 rounded-lg p-6 shadow-md">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full text-gray-300 bg-gray-900 mb-4 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
        />

        {/* User table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border text-gray-400 border-gray-400 px-4 py-2">ID</th>
                <th className="border text-gray-400 border-gray-400 px-4 py-2">Fullname</th>
                <th className="border text-gray-400 border-gray-400 px-4 py-2">Email</th>
                <th className="border text-gray-400 border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="border text-gray-400 border-gray-400 px-4 py-2">{user.id}</td>
                  <td className="border text-gray-400 border-gray-400 px-4 py-2">{user.fullname}</td>
                  <td className="border text-gray-400 border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border text-gray-400 border-gray-400 px-4 py-2 flex flex-col sm:flex-row justify-center items-center">
                    <button
                      className="bg-red-500 text-white font-bold py-1 px-2 rounded mr-2 mb-2 sm:mb-0"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit user modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-gray-800 text-gray-300 p-6 rounded-md shadow-md max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <div className="mb-4">
          <label className="block text-sm mb-2">Fullname</label>
          <input
            type="text"
            name="fullname"
            value={editUser?.fullname || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={editUser?.email || ''}
            onChange={handleEditChange}
            className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setModalIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={saveChanges}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
