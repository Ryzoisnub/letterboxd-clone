import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Profile from './pages/Profile'
import Search from './pages/Search'

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', minWidth: '100vw', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
        <AppBar position="static" elevation={0} sx={{
          background: 'linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%)',
          boxShadow: 'none',
          py: 1,
        }}>
          <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 700, letterSpacing: 1, color: '#222', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
              Letterboxd Clone
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
              <Button color="inherit" component={Link} to="/" sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                background: 'rgba(255,255,255,0.7)',
                color: '#222',
                fontWeight: 500,
                boxShadow: 1,
                '&:hover': { background: 'rgba(255,255,255,0.9)' }
              }}>Home</Button>
              <Button color="inherit" component={Link} to="/search" sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                background: 'rgba(255,255,255,0.7)',
                color: '#222',
                fontWeight: 500,
                boxShadow: 1,
                '&:hover': { background: 'rgba(255,255,255,0.9)' }
              }}>Search</Button>
              <Button color="inherit" component={Link} to="/profile" sx={{
                borderRadius: 3,
                px: 3,
                py: 1,
                background: 'rgba(255,255,255,0.7)',
                color: '#222',
                fontWeight: 500,
                boxShadow: 1,
                '&:hover': { background: 'rgba(255,255,255,0.9)' }
              }}>Profile</Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 100px)', width: '100vw' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App
