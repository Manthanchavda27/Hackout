import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('hydromap_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    const userInfo = {
      ...userData,
      loginTime: new Date().toISOString(),
      isCreator: userData.name?.toLowerCase() === 'manthan chavda' || userData.email?.toLowerCase() === 'manthan@hydromap.com'
    };
    
    setUser(userInfo);
    setIsAuthenticated(true);
    localStorage.setItem('hydromap_user', JSON.stringify(userInfo));
  };

  const signup = (userData) => {
    const userInfo = {
      ...userData,
      joinDate: new Date().toISOString(),
      isCreator: userData.name?.toLowerCase() === 'manthan chavda' || userData.email?.toLowerCase() === 'manthan@hydromap.com',
      role: userData.name?.toLowerCase() === 'manthan chavda' ? 'Creator & Founder' : 'Energy Analyst'
    };
    
    setUser(userInfo);
    setIsAuthenticated(true);
    localStorage.setItem('hydromap_user', JSON.stringify(userInfo));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hydromap_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('hydromap_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};