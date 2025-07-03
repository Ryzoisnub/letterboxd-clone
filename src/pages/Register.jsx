import React, { useState } from 'react';
import axios from 'axios';
import { Box, Card, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/src/assets/horror-collage.jpg') center/cover no-repeat`,
        backgroundAttachment: 'fixed',
      }} />
      <Box sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        fontFamily: 'SF Pro Display, Arial, sans-serif'
      }}>
        <Card sx={{ width: 350, p: 4, borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(60,60,60,0.10)', background: '#fff', border: '1px solid #ececec' }}>
          <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 3, color: '#222', letterSpacing: 0.5 }}>Sign Up</Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <TextField label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} required fullWidth variant="outlined" sx={{ background: '#fafbfc', borderRadius: 3, input: { fontSize: 17, padding: '14px 12px' } }} />
            <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth variant="outlined" sx={{ background: '#fafbfc', borderRadius: 3, input: { fontSize: 17, padding: '14px 12px' } }} />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth variant="outlined" sx={{ background: '#fafbfc', borderRadius: 3, input: { fontSize: 17, padding: '14px 12px' } }} />
            <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: 3, background: 'linear-gradient(90deg, #007aff 0%, #0051a8 100%)', color: '#fff', fontWeight: 600, fontSize: 17, py: 1.5, boxShadow: '0 2px 8px 0 rgba(0,122,255,0.10)' }}>Sign Up</Button>
          </form>
          {message && <Typography color="success.main" align="center" sx={{ mt: 2, fontSize: 15 }}>{message}</Typography>}
          {error && <Typography color="error" align="center" sx={{ mt: 2, fontSize: 15 }}>{error}</Typography>}
        </Card>
      </Box>
    </>
  );
};

export default Register; 