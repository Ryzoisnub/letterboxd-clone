import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Grid, Button, Avatar, Paper, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import StarIcon from '@mui/icons-material/Star';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import { fetchPopularMovies, searchMovies, fetchGenres } from '../config/tmdb';
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE } from '../config/tmdb';

const heroBg = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80';
const features = [
  { icon: <MovieIcon fontSize="large" />, title: 'Track every film', desc: 'Keep track of every film youve ever watched or want to see.' },
  { icon: <StarIcon fontSize="large" />, title: 'Rate & Review', desc: 'Rate each film on a five-star scale and review your favorites.' },
  { icon: <ListAltIcon fontSize="large" />, title: 'Create Lists', desc: 'Compile and share lists of films for any occasion.' },
  { icon: <GroupIcon fontSize="large" />, title: 'Connect', desc: 'Follow friends and see what theyre watching.' },
];
const reviews = [
  { id: 1, user: 'filmfan', avatar: 'https://i.pravatar.cc/150?img=1', movie: 'Inception', review: 'A mind-bending masterpiece! Nolan at his best.', date: '2023-06-01' },
  { id: 2, user: 'cinemalover', avatar: 'https://i.pravatar.cc/150?img=2', movie: 'La La Land', review: 'Beautiful music and visuals. A modern classic.', date: '2023-05-20' },
];
const lists = [
  { id: 1, title: 'Top 10 Sci-Fi', user: 'filmfan', movies: ['Inception', 'Interstellar', 'Elio'] },
  { id: 2, title: 'Best Musicals', user: 'cinemalover', movies: ['La La Land', 'Sorry, Baby'] },
];

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchPopularMovies()
      .then(data => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load movies');
        setLoading(false);
      });
    fetchGenres().then(data => setGenres(data.genres || []));
  }, []);

  // Search and filter handler
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let data;
      if (search.trim()) {
        console.log('Searching for:', search);
        data = await searchMovies(search);
        console.log('Search API response:', data);
      } else {
        data = await fetchPopularMovies();
        console.log('Popular movies API response:', data);
      }
      let filtered = data.results || [];
      if (selectedGenre) {
        filtered = filtered.filter(m => m.genre_ids && m.genre_ids.includes(Number(selectedGenre)));
      }
      if (releaseYear) {
        filtered = filtered.filter(m => m.release_date && m.release_date.startsWith(releaseYear));
      }
      setMovies(filtered);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error('Error fetching movies:', err);
    }
    setLoading(false);
  };

  // Years for release date filter
  const years = Array.from({ length: 40 }, (_, i) => `${2024 - i}`);

  return (
    <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', color: '#fff', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', width: '100%', minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, rgba(24,28,36,0.8) 60%, #181c24 100%), url(${heroBg}) center/cover no-repeat`,
          zIndex: 1,
        }} />
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', py: 8, width: '100%' }}>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, color: '#fff', textShadow: '0 2px 16px #000a' }}>
            Track films you've watched.<br />Save those you want to see.<br />Tell your friends what's good.
          </Typography>
          <Button variant="contained" sx={{ mt: 3, fontWeight: 700, fontSize: 20, px: 5, py: 1.5, borderRadius: 3, background: 'linear-gradient(90deg, #00e676 0%, #00c853 100%)', color: '#181c24', boxShadow: '0 2px 8px #00e67644' }}>
            Get started — it's free!
          </Button>
        </Box>
      </Box>
      {/* Search & Filter */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <TextField
            label="Search movies"
            variant="outlined"
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ bgcolor: '#232a36', borderRadius: 2, input: { color: '#fff' }, label: { color: '#b0b8c1' }, minWidth: 220 }}
            InputLabelProps={{ style: { color: '#b0b8c1' } }}
          />
          <FormControl sx={{ minWidth: 160 }} size="small">
            <InputLabel id="genre-label" sx={{ color: '#b0b8c1' }}>Genre</InputLabel>
            <Select
              labelId="genre-label"
              value={selectedGenre}
              label="Genre"
              onChange={e => setSelectedGenre(e.target.value)}
              sx={{ bgcolor: '#232a36', color: '#fff', borderRadius: 2 }}
            >
              <MenuItem value="">All</MenuItem>
              {genres.map(g => (
                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="year-label" sx={{ color: '#b0b8c1' }}>Year</InputLabel>
            <Select
              labelId="year-label"
              value={releaseYear}
              label="Year"
              onChange={e => setReleaseYear(e.target.value)}
              sx={{ bgcolor: '#232a36', color: '#fff', borderRadius: 2 }}
            >
              <MenuItem value="">All</MenuItem>
              {years.map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1, background: 'linear-gradient(90deg, #1976d2 0%, #90caf9 100%)', color: '#181c24', boxShadow: '0 2px 8px #1976d244' }}>Search</Button>
        </form>
      </Box>
      {/* Movie Grid */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Movies</Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="flex-start">
            {movies.length === 0 && (
              <Typography sx={{ ml: 2 }}>No movies found.</Typography>
            )}
            {movies.map(movie => (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <Card sx={{ bgcolor: '#232a36', borderRadius: 3, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    image={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.title}
                    sx={{ height: 320, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ textAlign: 'center', color: '#fff', p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{movie.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {/* Feature Grid */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper sx={{ bgcolor: '#232a36', p: 3, borderRadius: 3, textAlign: 'center', color: '#fff', boxShadow: 2 }}>
                {f.icon}
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Recent Reviews */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Just Reviewed</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 3, pb: 2 }}>
          {reviews.map(r => (
            <Card key={r.id} sx={{ minWidth: 320, maxWidth: 320, bgcolor: '#232a36', borderRadius: 3, boxShadow: 3, flex: '0 0 auto', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', p: 2 }}>
              <Avatar src={r.avatar} sx={{ width: 48, height: 48, mr: 2, mt: 1 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{r.user}</Typography>
                <Typography variant="body2" color="text.secondary">{r.movie} — {r.date}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>{r.review}</Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      {/* Popular Lists */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#fff' }}>Popular Lists</Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 3, pb: 2 }}>
          {lists.map(list => (
            <Card key={list.id} sx={{ minWidth: 260, maxWidth: 260, bgcolor: '#232a36', borderRadius: 3, boxShadow: 3, flex: '0 0 auto', p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{list.title}</Typography>
              <Typography variant="body2" color="text.secondary">by {list.user}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                {list.movies.map((m, i) => (
                  <Paper key={i} sx={{ bgcolor: '#181c24', color: '#fff', px: 1.5, py: 0.5, borderRadius: 2, fontSize: 13, fontWeight: 600, boxShadow: 1, mb: 1 }}>{m}</Paper>
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Home; 