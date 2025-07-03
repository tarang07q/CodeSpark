import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { GiSparkSpirit } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', mb: 4 }} elevation={6}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <GiSparkSpirit size={36} style={{ marginRight: 12 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
            CodeSpark
          </Typography>
        </Box>
        {user ? (
          <>
            <Avatar sx={{ bgcolor: '#fff', color: '#764ba2', mr: 2 }}>{user.username[0]?.toUpperCase()}</Avatar>
            <Typography sx={{ mr: 2, fontWeight: 'bold' }}>{user.username}</Typography>
            <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 'bold', mx: 1 }}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 'bold', mx: 1 }}>Login</Button>
            <Button color="inherit" component={Link} to="/register" sx={{ fontWeight: 'bold', mx: 1 }}>Register</Button>
          </>
        )}
        <Button color="inherit" component={Link} to="/editor" sx={{ fontWeight: 'bold', mx: 1 }}>Editor</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 