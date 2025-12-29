import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db, FireMember } from '../firebase';

type Member = FireMember;

interface AuthContextValue {
  user: Member | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, regNo: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Maintain session
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const q = query(collection(db, 'members'), where('email', '==', fbUser.email));
      const snap = await getDocs(q);

      if (!snap.empty) {
        setUser({ id: snap.docs[0].id, ...(snap.docs[0].data() as Member) });
      } else {
        console.error('User signed in but no Firestore profile found');
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // 🔑 Login
  const login = async (email: string, regNo: string) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), regNo.trim());
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || 'Login failed' };
    }
  };

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
