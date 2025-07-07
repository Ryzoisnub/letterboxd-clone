import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Button, Alert, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MovieIcon from '@mui/icons-material/Movie';
import ListAltIcon from '@mui/icons-material/ListAlt';

const bannerBg = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80';
const sampleStats = [
  { icon: <MovieIcon sx={{ color: '#00e676' }} />, label: 'Films', value: 128 },
  { icon: <StarIcon sx={{ color: '#ffd600' }} />, label: 'Reviews', value: 34 },
  { icon: <ListAltIcon sx={{ color: '#90caf9' }} />, label: 'Lists', value: 7 },
];
const reviews = [
  { id: 1, movie: 'Inception', review: 'A mind-bending masterpiece! Nolan at his best.', date: '2023-06-01' },
  { id: 2, movie: 'La La Land', review: 'Beautiful music and visuals. A modern classic.', date: '2023-05-20' },
];

function Profile({ user: loggedInUser }) {
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username || '');
      setEmail(loggedInUser.email || '');
      setBio(loggedInUser.bio || '');
      setAvatar(loggedInUser.avatar || '');
    }
  }, [loggedInUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/auth/profile', { bio, avatar }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
      setBio(res.data.user.bio);
      setAvatar(res.data.user.avatar);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <Box sx={{ bgcolor: '#181c24', minHeight: '100vh', color: '#fff', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
      {/* Banner and Avatar */}
      <Box sx={{ position: 'relative', width: '100%', minHeight: 260, mb: 4 }}>
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, rgba(24,28,36,0.8) 60%, #181c24 100%), url(${bannerBg}) center/cover no-repeat`,
          zIndex: 1,
        }} />
        <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end', pl: 8, pb: 3, height: '100%' }}>
          <Avatar src={avatar || 'https://i.pravatar.cc/150?img=3'} sx={{ width: 110, height: 110, border: '4px solid #232a36', boxShadow: 3, mr: 3 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', textShadow: '0 2px 8px #000a' }}>{username}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>{email}</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: '#b0b8c1' }}>{bio}</Typography>
          </Box>
        </Box>
      </Box>
      {/* Stats */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 4 }}>
        <Grid container spacing={3} justifyContent="flex-start">
          {sampleStats.map((stat, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Paper sx={{ bgcolor: '#232a36', p: 3, borderRadius: 3, textAlign: 'center', color: '#fff', boxShadow: 2 }}>
                {stat.icon}
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Edit Profile */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 4 }}>
        <Paper elevation={2} sx={{ bgcolor: '#232a36', p: 3, borderRadius: 3, boxShadow: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 600, color: '#fff' }}>Edit Profile</Typography>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <TextField label="Bio" value={bio} onChange={e => setBio(e.target.value)} fullWidth multiline minRows={2} sx={{ mb: 2, bgcolor: '#232a36', input: { color: '#fff' }, label: { color: '#b0b8c1' } }} />
            <TextField label="Avatar URL" value={avatar} onChange={e => setAvatar(e.target.value)} fullWidth sx={{ mb: 2, bgcolor: '#232a36', input: { color: '#fff' }, label: { color: '#b0b8c1' } }} />
            <Button type="submit" variant="contained" sx={{ borderRadius: 3, background: 'linear-gradient(90deg, #00e676 0%, #00c853 100%)', color: '#181c24', fontWeight: 700, fontSize: 17, py: 1.2 }}>Save</Button>
          </form>
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
      </Box>
      {/* Latest Reviews */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Latest Reviews</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 3, pb: 2 }}>
          {reviews.map(r => (
            <Paper key={r.id} sx={{ minWidth: 320, maxWidth: 320, bgcolor: '#232a36', borderRadius: 3, boxShadow: 3, flex: '0 0 auto', p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{r.movie}</Typography>
              <Typography variant="body2" color="text.secondary">{r.date}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>{r.review}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Profile; 