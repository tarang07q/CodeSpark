import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { GiSparkSpirit } from 'react-icons/gi';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', mb: 4 }} elevation={6}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <GiSparkSpirit size={36} style={{ marginRight: 12 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
            CodeSpark
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 'bold', mx: 1 }}>Login</Button>
        <Button color="inherit" component={Link} to="/register" sx={{ fontWeight: 'bold', mx: 1 }}>Register</Button>
        <Button color="inherit" component={Link} to="/editor" sx={{ fontWeight: 'bold', mx: 1 }}>Editor</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 