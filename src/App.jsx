import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Login from './pages/Login'
import Register from './pages/Register'
import React, { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Try to load user from localStorage
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (userObj) => {
    setUser(userObj)
    localStorage.setItem('user', JSON.stringify(userObj))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // If not logged in, only show login/register
  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    )
  }

  // If logged in, show the app with logout button at top right
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', minWidth: '100vw', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
        <AppBar position="static" elevation={0} sx={{
          background: 'linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%)',
          boxShadow: 'none',
          py: 1,
        }}>
          <Toolbar sx={{ justifyContent: 'space-between', flexDirection: 'row', gap: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 700, letterSpacing: 1, color: '#222', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
              Letterboxd Clone
            </Typography>
            <Box>
              <Button color="inherit" onClick={handleLogout} sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                background: 'rgba(255,255,255,0.7)',
                color: '#222',
                fontWeight: 500,
                boxShadow: 1,
                '&:hover': { background: 'rgba(255,255,255,0.9)' },
                position: 'absolute',
                right: 24,
                top: 16
              }}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 100px)', width: '100vw' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App
