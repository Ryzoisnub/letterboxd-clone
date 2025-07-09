import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Avatar, Paper, TextField, Button, Alert, Grid, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const bannerBg = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80';

// Example review data structure (simulate fetching from backend)
const initialReviews = [
  // {
  //   id: 1,
  //   movie: 'Inception',
  //   review: 'A mind-bending masterpiece! Nolan at his best.',
  //   date: '2023-06-01',
  //   poster: 'https://image.tmdb.org/t/p/w500/8s4h9friP6Ci3adRGahHARVd76E.jpg',
  // },
];

function Profile({ user: loggedInUser }) {
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState(initialReviews);
  const fileInputRef = useRef();

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username || '');
      setEmail(loggedInUser.email || '');
      setAvatar(loggedInUser.avatar || '');
      setAvatarPreview(loggedInUser.avatar || '');
    }
  }, [loggedInUser]);

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    // Simulate save (no backend)
    setMessage('Profile updated successfully!');
    if (avatarFile) {
      setAvatar(avatarPreview);
    }
  };

  return (
    <Box sx={{ bgcolor: 'linear-gradient(135deg, #232a36 0%, #181c24 100%)', minHeight: '100vh', color: '#fff', fontFamily: 'SF Pro Display, Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Banner and Avatar */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 900, minHeight: 160, mb: 2, overflow: 'visible', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, rgba(24,28,36,0.8) 60%, #181c24 100%), url(${bannerBg}) center/cover no-repeat`,
          zIndex: 1,
          filter: 'blur(1.2px) brightness(0.8)',
          borderRadius: 5,
        }} />
        <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', pl: 0, pb: 2, height: '100%', width: '100%', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative', mr: 4, boxShadow: 6, borderRadius: '50%', background: 'rgba(24,28,36,0.7)', backdropFilter: 'blur(6px)', p: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={avatarPreview || 'https://i.pravatar.cc/150?img=3'} sx={{ width: 90, height: 90, border: '4px solid #00e676', boxShadow: 6, position: 'relative', zIndex: 2, mb: 1 }} />
            <Button
              variant="contained"
              sx={{
                mt: 1,
                background: 'linear-gradient(90deg, #00e676 0%, #00c853 100%)',
                color: '#181c24',
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: 2,
                px: 3,
                py: 0.7,
                textTransform: 'none',
                fontSize: 15,
                minWidth: 90,
                '&:hover': { background: 'linear-gradient(90deg, #00c853 0%, #00e676 100%)', boxShadow: 4 },
              }}
              onClick={() => fileInputRef.current.click()}
            >
              Upload
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </Box>
          <Box sx={{ ml: 2, minWidth: 0 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', textShadow: '0 2px 12px #000a', letterSpacing: 1, fontSize: 36, mb: 0.5, lineHeight: 1 }}>{username}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500, fontSize: 17, mb: 0.5 }}>{email}</Typography>
          </Box>
        </Box>
      </Box>
      {/* Reviews Grid */}
      <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', mb: 6, px: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#fff', letterSpacing: 1 }}>Your Reviews</Typography>
        {reviews.length === 0 ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
            <Typography variant="h4" align="center" sx={{ color: '#b0b8c1', fontWeight: 700, letterSpacing: 2, opacity: 0.7, border: '2px dashed #00e676', borderRadius: 3, px: 4, py: 2, background: alpha('#232a36', 0.5), boxShadow: 2 }}>
              NO REVIEWS YET
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {reviews.map((r, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={r.id} sx={{ animation: 'fadeIn 0.7s', animationDelay: `${idx * 0.1}s`, animationFillMode: 'backwards' }}>
                <Paper
                  sx={{
                    position: 'relative',
                    minHeight: 180,
                    borderRadius: 4,
                    boxShadow: 6,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 0,
                    border: '1.5px solid #00e67644',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'scale(1.03)', boxShadow: 12 },
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {/* Dimmed poster background */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(180deg, rgba(24,28,36,0.7) 60%, #181c24 100%), url(${r.poster}) center/cover no-repeat`,
                      filter: 'brightness(0.6) blur(1.5px)',
                      zIndex: 1,
                    }}
                  />
                  <Box sx={{ position: 'relative', zIndex: 2, p: 2, bgcolor: alpha('#232a36', 0.7), borderRadius: 4, m: 1, boxShadow: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>{r.movie}</Typography>
                    <Typography variant="body2" sx={{ color: '#b0b8c1', mb: 1 }}>{r.date}</Typography>
                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>{r.review}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {/* Fade-in animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </Box>
  );
}

export default Profile; 