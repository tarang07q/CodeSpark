import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, TextField, Button, Avatar } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/editor');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      setSuccess('Registration successful! You can now login.');
      setError('');
    } catch (err) {
      setError('Registration failed');
      setSuccess('');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }}>
      <Card sx={{ minWidth: 350, maxWidth: 400, p: 3, borderRadius: 4, boxShadow: 8 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'white', width: 72, height: 72, mb: 2, boxShadow: 3 }}>
            <FaUserPlus size={48} color="#185a9d" />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#185a9d' }}>Register</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontWeight: 'bold', fontSize: 16, borderRadius: 2, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' }} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Box>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
          <Typography sx={{ mt: 2 }}>Already have an account? <a href="/login" style={{ color: '#185a9d', textDecoration: 'underline' }}>Login</a></Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register; 