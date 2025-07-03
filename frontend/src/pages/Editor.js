import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Button, CircularProgress } from '@mui/material';
import { SiCodeforces } from 'react-icons/si';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';

function Editor() {
  const [code, setCode] = useState('// Start coding!');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load code on mount
  useEffect(() => {
    const fetchCode = async () => {
      setLoading(true);
      setMessage('');
      try {
        const res = await axios.get('http://localhost:5000/api/code/mine', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCode(res.data.code);
      } catch (err) {
        setMessage('Failed to load code.');
      }
      setLoading(false);
    };
    fetchCode();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/code/save', { code }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Code saved!');
    } catch (err) {
      setMessage('Failed to save code.');
    }
    setSaving(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
      <Card sx={{ minWidth: 500, maxWidth: 900, p: 4, borderRadius: 4, boxShadow: 8 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'white', width: 80, height: 80, mb: 2, boxShadow: 3 }}>
            <SiCodeforces size={56} color="#fcb69f" />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#fcb69f' }}>Code Editor</Typography>
          {loading ? (
            <CircularProgress sx={{ my: 4 }} />
          ) : (
            <Box sx={{ width: '100%', height: 400, mb: 2 }}>
              <MonacoEditor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                onChange={value => setCode(value)}
                theme="vs-dark"
                options={{ fontSize: 16, minimap: { enabled: false } }}
              />
            </Box>
          )}
          <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || loading} sx={{ fontWeight: 'bold', borderRadius: 2, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', mb: 1 }}>
            {saving ? 'Saving...' : 'Save Code'}
          </Button>
          {message && <Typography color={message.includes('Failed') ? 'error' : 'success.main'} sx={{ mt: 1 }}>{message}</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Editor; 