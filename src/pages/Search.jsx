import React, { useState } from 'react';
import { TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

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
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Search Movies</Typography>
      <form onSubmit={handleSearch}>
        <TextField
          label="Movie Title"
          variant="outlined"
          fullWidth
          value={query}
          onChange={e => setQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            label="Genre"
            onChange={e => setGenre(e.target.value)}
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
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {actors.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" fullWidth>Search</Button>
      </form>
    </Box>
  );
}

export default Search; 