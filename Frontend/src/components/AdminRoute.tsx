import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../api/axios';

export const AdminRoute: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setLoading(false);
        setIsAdmin(false);
        return;
      }

      try {
        const response = await api.get('/Auth/me');
        console.log('AdminRoute fetched user:', response.data);

        if (response.data && response.data.is_admin === true) {
          localStorage.setItem('user', JSON.stringify(response.data));
          setIsAdmin(true);
        } else {
          console.warn('User is not an admin:', response.data);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Failed to verify admin status:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm font-medium text-gray-600">Verifying admin access...</p>
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};