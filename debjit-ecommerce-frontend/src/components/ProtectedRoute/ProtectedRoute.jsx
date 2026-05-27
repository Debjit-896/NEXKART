import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import emptyCartImg from '../../assets/empty-cart-login.png';
import RequireLogin from '../RequireLogin/RequireLogin';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <RequireLogin />;
  }

  return children;
};

export default ProtectedRoute;
