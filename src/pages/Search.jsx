import React, { useState } from 'react';
import { TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl, Button, Paper } from '@mui/material';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']; // Sample genres
const actors = ['Tom Hanks', 'Scarlett Johansson', 'Leonardo DiCaprio', 'Emma Stone']; // Sample actors

function Search() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [actor, setActor] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic will go here
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 500, borderRadius: 6, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 700, color: '#222' }}>Search Movies</Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="Movie Title"
            variant="outlined"
            fullWidth
            value={query}
            onChange={e => setQuery(e.target.value)}
            sx={{ mb: 2, background: '#f7f7f7', borderRadius: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={genre}
              label="Genre"
              onChange={e => setGenre(e.target.value)}
              sx={{ background: '#f7f7f7', borderRadius: 2 }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {genres.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Actor/Cast</InputLabel>
            <Select
              value={actor}
              label="Actor/Cast"
              onChange={e => setActor(e.target.value)}
              sx={{ background: '#f7f7f7', borderRadius: 2 }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {actors.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ borderRadius: 3, fontWeight: 600, background: 'linear-gradient(90deg, #e0eafc 0%, #cfdef3 100%)', color: '#222', boxShadow: 1, py: 1.2, mt: 1 }}>Search</Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Search; 