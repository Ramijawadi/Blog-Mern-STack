import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by calling profile endpoint
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Not authenticated');
    })
    .then(userInfo => {
      setUserInfo(userInfo);
    })
    .catch(err => {
      console.log('User not authenticated:', err.message);
      setUserInfo(null);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <header>
        <Link to='/' className='logo'>My Blog</Link>
        <nav>
          <span>Loading...</span>
        </nav>
      </header>
    );
  }

  return (
    <header>
      <Link to='/' className='logo'>My Blog</Link>

      <nav>
        {userInfo ? (
          // User is logged in
          <>
            <span className="welcome-user">Welcome, {userInfo.username}!</span>
            <Link to='/create-post'>Create Post</Link>
            <LogoutButton />
          </>
        ) : (
          // User is not logged in
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header