import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          
          if (authData && typeof authData === 'object' && 
              typeof authData.isAuthenticated === 'boolean' && 
              authData.user && typeof authData.user === 'object') {
            setIsAuthenticated(authData.isAuthenticated);
            setUser(authData.user);
          } else {
            console.warn('Dados de autenticação inválidos, removendo...');
            localStorage.removeItem('auth');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
        try {
          localStorage.removeItem('auth');
        } catch (storageError) {
          console.error('Erro ao limpar localStorage:', storageError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = (userData) => {
    try {
      if (!userData || typeof userData !== 'object' || !userData.id || !userData.email) {
        throw new Error('Dados de usuário inválidos para login');
      }

      setIsAuthenticated(true);
      setUser(userData);
      
      const authData = {
        isAuthenticated: true,
        user: userData
      };
      
      localStorage.setItem('auth', JSON.stringify(authData));
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('auth');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
