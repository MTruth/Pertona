import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update currentUser when auth state changes
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null); // Clear the current user
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 