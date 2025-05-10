import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (authData) => {
    localStorage.setItem('DSA-Sheet-auth', JSON.stringify({
        token: authData.token,
        user: authData.user
      }));
    setToken(authData);
  };
  const logout = () => {
    localStorage.removeItem('DSA-Sheet-auth');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuth: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
