// src/components/SignIn.tsx
'use client'
import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn, role,user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      alert('Login successful');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (role === 'admin') {
        router.push('/admindashboard');
      } else if (role === 'user') {
        router.push('/userdashboard');
      } else {
        router.push('/');
      }
    }
  }, [user, role, router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-400">Sign In</h2>
        <form onSubmit={handleLogIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link href="/register" className="text-red-500 hover:underline">Sign Up</Link>
        </p>
      </motion.div>
      
    </div>
  );
};

export default SignIn;
