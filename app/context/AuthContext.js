'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '../config/api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.CHECK_AUTH, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log('API Response:', result);

          if (result.status && result.data) { 
            setUser({
              id: result.data.data.id,
              type: Number(result.data.data.type),
              email: result.data.data.mail,
              name: result.data.data.name,
              avatar: result.data.data.image || `https://ui-avatars.com/api/?name=${result.data.data.name}&background=random`,
              phone: result.data.data.phone
            });
          } else {
            Cookies.remove('token');
            setUser(null);
          }
        } else {
          Cookies.remove('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        Cookies.remove('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mail: email,
          pass: password
        })
      });

      const result = await response.json();
      console.log('Login Response:', result);

      if (result.status && result.data.token) {
        Cookies.set('token', result.data.token, { expires: 365 });
        
        setUser({
          id: result.data.data.id,
          type: Number(result.data.data.type),
          email: result.data.data.mail,
          name: result.data.data.name,
          avatar: result.data.data.image || `https://ui-avatars.com/api/?name=${result.data.data.name}&background=random`,
          phone: result.data.data.phone
        });

        router.push('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        await fetch(API_ENDPOINTS.LOGOUT, { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 