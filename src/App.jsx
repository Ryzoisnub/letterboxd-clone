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

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
      paper: '#fff',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#e53935',
    },
    text: {
      primary: '#222',
      secondary: '#888',
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
      <ThemeProvider theme={lightTheme}>
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
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', minWidth: '100vw', background: '#fff', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
          <AppBar position="static" elevation={0} sx={{
            background: '#fff',
            boxShadow: '0 2px 8px #eee',
            py: 1,
            borderBottom: '1px solid #eee',
          }}>
            <Toolbar sx={{ justifyContent: 'space-between', flexDirection: 'row', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />} sx={{ fontWeight: 700, textTransform: 'none', fontSize: 18, letterSpacing: 1, px: 2, borderRadius: 2, color: '#222', '&:hover': { background: '#f5f5f5' } }}>Home</Button>
                <Button component={Link} to="/profile" color="inherit" startIcon={<AccountCircleIcon />} sx={{ fontWeight: 700, textTransform: 'none', fontSize: 18, letterSpacing: 1, px: 2, borderRadius: 2, color: '#222', '&:hover': { background: '#f5f5f5' } }}>Profile</Button>
              </Box>
              <Box>
                <Button color="inherit" onClick={handleLogout} sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  background: '#f5f5f5',
                  color: '#222',
                  fontWeight: 600,
                  fontSize: 16,
                  boxShadow: 1,
                  '&:hover': { background: '#eee' },
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
