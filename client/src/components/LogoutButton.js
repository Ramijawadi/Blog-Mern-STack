import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = '', style = {} }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Logout successful:', data.message);
        // Redirect to login page after successful logout
        navigate('/login');
      } else {
        console.error('❌ Logout failed:', data.error);
        alert('Logout failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Logout network error:', err);
      alert('Network error occurred during logout');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isLoggingOut}
      className={`logout-button ${className}`}
      style={style}
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
      
      <style jsx>{`
        .logout-button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .logout-button:hover:not(:disabled) {
          background-color: #c82333;
        }

        .logout-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .logout-button:active {
          transform: translateY(1px);
        }
      `}</style>
    </button>
  );
};

export default LogoutButton;