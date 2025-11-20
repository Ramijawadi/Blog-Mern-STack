import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError('');

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
        setSuccess(true);
        console.log('✅ Logout successful:', data.message);
        
        // Redirect after a short delay to show success message
        setTimeout(() => {
          setRedirect(true);
        }, 1500);
      } else {
        setError(data.error || 'Logout failed');
        console.error('❌ Logout failed:', data.error);
      }
    } catch (err) {
      setError('Network error occurred during logout');
      console.error('❌ Logout network error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Auto logout on component mount
  useEffect(() => {
    handleLogout();
  }, []);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="logout-page">
      <div className="logout-container">
        <h1>Logging Out</h1>
        
        {isLoggingOut && (
          <div className="logout-status">
            <div className="spinner"></div>
            <p>Logging you out safely...</p>
          </div>
        )}

        {success && (
          <div className="success-message">
            <p>✅ You have been logged out successfully!</p>
            <p>Redirecting to login page...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={handleLogout} disabled={isLoggingOut}>
              Try Again
            </button>
            <button onClick={() => setRedirect(true)}>
              Go to Login
            </button>
          </div>
        )}

        {!isLoggingOut && !success && !error && (
          <div className="logout-confirmation">
            <p>Are you sure you want to log out?</p>
            <div className="logout-buttons">
              <button onClick={handleLogout} className="confirm-logout">
                Yes, Log Out
              </button>
              <button onClick={() => setRedirect(false)} className="cancel-logout">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .logout-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
          padding: 20px;
        }

        .logout-container {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        .logout-container h1 {
          margin-bottom: 30px;
          color: #333;
          font-size: 24px;
        }

        .logout-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          color: #28a745;
          font-weight: 500;
        }

        .success-message p {
          margin: 10px 0;
        }

        .error-message {
          color: #dc3545;
          margin-bottom: 20px;
        }

        .error-message p {
          margin-bottom: 15px;
        }

        .error-message button {
          margin: 5px;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .error-message button:first-of-type {
          background-color: #007bff;
          color: white;
        }

        .error-message button:last-of-type {
          background-color: #6c757d;
          color: white;
        }

        .logout-confirmation p {
          margin-bottom: 25px;
          color: #666;
          font-size: 16px;
        }

        .logout-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .confirm-logout {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .confirm-logout:hover {
          background-color: #c82333;
        }

        .cancel-logout {
          background-color: #6c757d;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .cancel-logout:hover {
          background-color: #545b62;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default LogoutPage;