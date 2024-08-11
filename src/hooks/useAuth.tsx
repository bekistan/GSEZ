// src/hooks/useAuth.tsx
'use client'
import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, User,signOut } from 'firebase/auth';
import { getDoc,setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase';

interface AuthContextProps {
  user: User | null;
  role: string | null;
  loading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const roleDoc = await getDoc(doc(firestore, 'roles', user.uid));
        setRole(roleDoc.data()?.role || null);
      } else {
        setRole(null);
      }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);
      
      // Save the user information to Firestore
      const userDoc = doc(firestore, "users", userCredential.user.uid);
      await setDoc(userDoc, {
        email,
        fullName,
        uid: userCredential.user.uid,
      });
      
      // Set role in Firestore (example role: 'user')
      const roleDoc = doc(firestore, 'roles', userCredential.user.uid);
      await setDoc(roleDoc, { role: 'user' });
      console.log('User document and role set in Firestore');
    } catch (error) {
      console.error('Error signing up and setting user data in Firestore:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  
  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };
  
  
  

  return (
    <AuthContext.Provider value={{ user, role, loading, logIn, signUp,logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
