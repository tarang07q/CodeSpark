import React, { useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, TextField, Button, Avatar } from '@mui/material';
import { FaUserAstronaut } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend URL
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/editor';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Card sx={{ minWidth: 350, maxWidth: 400, p: 3, borderRadius: 4, boxShadow: 8 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'white', width: 72, height: 72, mb: 2, boxShadow: 3 }}>
            <FaUserAstronaut size={48} color="#764ba2" />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#764ba2' }}>Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>Login</Button>
          </Box>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          <Typography sx={{ mt: 2 }}>Don't have an account? <a href="/register" style={{ color: '#764ba2', textDecoration: 'underline' }}>Register</a></Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login; 