import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { SiCodeforces } from 'react-icons/si';

function Editor() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
      <Card sx={{ minWidth: 500, maxWidth: 700, p: 4, borderRadius: 4, boxShadow: 8 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'white', width: 80, height: 80, mb: 2, boxShadow: 3 }}>
            <SiCodeforces size={56} color="#fcb69f" />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#fcb69f' }}>Code Editor</Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#333' }}>This is where the code editor will be implemented.</Typography>
          <Box sx={{ width: '100%', height: 300, bgcolor: '#fff', borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 24 }}>
            [Code Editor Coming Soon]
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Editor; 