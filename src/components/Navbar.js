import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ isAuthenticated, user }) => {
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('token');
      window.location.href = '/auth';
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          CodeSpark
        </Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span>Welcome, {user?.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login/Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;