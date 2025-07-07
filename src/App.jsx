import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Login from './pages/Login'
import Register from './pages/Register'
import React, { useState, useEffect } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181c24',
      paper: '#232a36',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#90caf9',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b8c1',
    },
  },
  typography: {
    fontFamily: 'SF Pro Display, Arial, sans-serif',
  },
});

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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    )
  }

  // If logged in, show the app with logout button at top right
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', minWidth: '100vw', background: 'linear-gradient(135deg, #232a36 0%, #181c24 100%)', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
          <AppBar position="static" elevation={0} sx={{
            background: 'linear-gradient(90deg, #232a36 0%, #181c24 100%)',
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.25)',
            py: 1,
            borderBottom: '1px solid #222',
          }}>
            <Toolbar sx={{ justifyContent: 'space-between', flexDirection: 'row', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />} sx={{ fontWeight: 700, textTransform: 'none', fontSize: 18, letterSpacing: 1, px: 2, borderRadius: 2, '&:hover': { background: 'rgba(25, 118, 210, 0.15)' } }}>Home</Button>
                <Button component={Link} to="/profile" color="inherit" startIcon={<AccountCircleIcon />} sx={{ fontWeight: 700, textTransform: 'none', fontSize: 18, letterSpacing: 1, px: 2, borderRadius: 2, '&:hover': { background: 'rgba(25, 118, 210, 0.15)' } }}>Profile</Button>
              </Box>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 800, letterSpacing: 2, color: '#fff', fontFamily: 'SF Pro Display, Arial, sans-serif', textShadow: '0 2px 8px #0008' }}>
                Letterboxd Clone
              </Typography>
              <Box>
                <Button color="inherit" onClick={handleLogout} sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: 1,
                  '&:hover': { background: 'rgba(255,255,255,0.18)' },
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
    </ThemeProvider>
  )
}

export default App
