import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #121212 0%, #2d3436 100%)',
    }}
  >
    <motion.div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        background: '#f953c6',
      }}
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        },
        scale: {
          repeat: Infinity,
          duration: 1,
          ease: 'easeInOut',
        },
      }}
    />
  </div>
);

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;