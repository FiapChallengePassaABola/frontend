import { signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'; 
import { get, ref } from 'firebase/database';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, realtimeDb } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {      
      if (firebaseUser) {
        try {
          const userRef = ref(realtimeDb, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);

          const jogadoraRef = ref(realtimeDb, `user_profiles/${firebaseUser.uid}/jogadora`);                                                                    
          const jogadoraSnapshot = await get(jogadoraRef);
          const isJogadora = jogadoraSnapshot.exists();

          let userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            isJogadora: isJogadora,
            isAdmin: false // default
          };

          if (snapshot.exists()) {
            const dbData = snapshot.val();
            userData = {
              ...userData,
              nome: dbData.displayName || dbData.nome || firebaseUser.displayName || 'Usuário',                                                                 
              isAdmin: dbData.isAdmin || false
            };
          } else {
            userData.nome = firebaseUser.displayName || 'Usuário';
          }

          setIsAuthenticated(true);
          setUser(userData);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            nome: firebaseUser.displayName || 'Usuário',
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            isJogadora: false,
            isAdmin: false
          };
          setIsAuthenticated(true);
          setUser(userData);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const updateUserProfile = (profileData) => {
    setUser((prev) => ({
      ...prev,
      ...profileData,
    }));
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
