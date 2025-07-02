import React, { useState } from 'react';
import axios from 'axios';
import { Box, Card, Typography, Button, TextField } from '@mui/material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin && onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f6f7f9', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
      <Card sx={{ width: 350, p: 4, borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(60,60,60,0.10)', background: '#fff', border: '1px solid #ececec' }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 3, color: '#222', letterSpacing: 0.5 }}>Sign In</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth variant="outlined" sx={{ background: '#fafbfc', borderRadius: 3, input: { fontSize: 17, padding: '14px 12px' } }} />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth variant="outlined" sx={{ background: '#fafbfc', borderRadius: 3, input: { fontSize: 17, padding: '14px 12px' } }} />
          <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: 3, background: 'linear-gradient(90deg, #007aff 0%, #0051a8 100%)', color: '#fff', fontWeight: 600, fontSize: 17, py: 1.5, boxShadow: '0 2px 8px 0 rgba(0,122,255,0.10)' }}>Sign In</Button>
        </form>
        {error && <Typography color="error" align="center" sx={{ mt: 2, fontSize: 15 }}>{error}</Typography>}
      </Card>
    </Box>
  );
};

export default Login; 