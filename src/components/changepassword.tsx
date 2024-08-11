
'use client';
import { useState } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const ChangePassword = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      if (newPassword !== confirmPassword) {
        setPasswordError('New passwords do not match');
        return;
      }
      try {
        const auth = getAuth();
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError(null);
        alert('Password changed successfully');
        router.push('/userdashboard');
      } catch (error) {
        setPasswordError('Failed to change password');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Change Password</h1>
      </header>
      <section className="mt-6">
        <form onSubmit={handleChangePassword} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-lg mb-2">Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full text-black px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full text-black px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full text-black px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Change Password
          </button>
          {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
        </form>
      </section>
    </div>
  );
};

export default ChangePassword;
