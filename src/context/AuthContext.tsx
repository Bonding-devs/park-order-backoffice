import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../models/user.tsx';
import axiosInstance from '../services/axios.ts';

interface AuthContextType {
  user: any;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const REDIRECTION_PAGE = '/list-applications';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (isLogin = false) => {
    try {
      const response = await axiosInstance.get('/api/v1/auth/me');
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      redirectionPage(response.data, isLogin);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const redirectionPage = async (user, isLogin) => {
    if (user) {
      if (isLogin) {
        const roleName = user.role.name.toLowerCase();
        if (roleName === 'owner') {
          navigate('/calendar');
        } else {
          navigate(REDIRECTION_PAGE);
        }
      } else {
        navigate(location.pathname);
      }
    }
  };

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const isLogin = true;
    await fetchUserProfile(isLogin);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
