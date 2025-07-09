import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Grid, Button, Avatar, Paper, TextField, MenuItem, Select, InputLabel, FormControl, Tabs, Tab, AppBar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { fetchTrendingMovies, fetchPopularMovies, searchMovies, fetchGenres } from '../config/tmdb';
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../config/tmdb';

const NAV_LINKS = [
  { label: 'Categories' },
  { label: 'Recommended' },
  { label: 'News' },
  { label: 'Newsletter' },
];
const CATEGORY_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Latest', value: 'latest' },
  { label: 'Coming Soon', value: 'upcoming' },
  { label: 'Top Rated', value: 'top_rated' },
];

function Home() {
  const [trending, setTrending] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('all');

  useEffect(() => {
    // Fetch trending for hero and carousel
    fetchTrendingMovies('day').then(data => {
      setTrending(data.results || []);
      setHeroMovie(data.results?.[0] || null);
      setCarouselMovies(data.results?.slice(1, 5) || []);
    });
    // Fetch genres
    fetchGenres().then(data => setGenres(data.genres || []));
    // Fetch initial grid (all)
    fetchPopularMovies().then(data => setMovies(data.results || []));
  }, []);

  // Tab/category handler
  const handleTabChange = async (e, value) => {
    setTab(value);
    setLoading(true);
    setError('');
    try {
      let data;
      if (value === 'all') {
        data = await fetchPopularMovies();
      } else if (value === 'latest') {
        data = await fetchPopularMovies(); // TMDB's /movie/latest is a single movie, so use popular as fallback
      } else if (value === 'upcoming') {
        const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3'}/movie/upcoming`, {
          ...TMDB_API_OPTIONS
        });
        data = await res.json();
      } else if (value === 'top_rated') {
        const res = await fetch(`${process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3'}/movie/top_rated`, {
          ...TMDB_API_OPTIONS
        });
        data = await res.json();
      }
      setMovies(data.results || []);
    } catch {
      setError('Failed to fetch movies');
    }
    setLoading(false);
  };

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let data;
      if (search.trim()) {
        data = await searchMovies(search);
      } else {
        data = await fetchPopularMovies();
      }
      let filtered = data.results || [];
      if (selectedGenre) {
        filtered = filtered.filter(m => m.genre_ids && m.genre_ids.includes(Number(selectedGenre)));
      }
      if (releaseYear) {
        filtered = filtered.filter(m => m.release_date && m.release_date.startsWith(releaseYear));
      }
      setMovies(filtered);
    } catch {
      setError('Failed to fetch movies');
    }
    setLoading(false);
  };

  const years = Array.from({ length: 40 }, (_, i) => `${2024 - i}`);

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: '#fafbfc', color: '#222', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
      {/* Nav Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none', py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, mx: 'auto', px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#e53935', letterSpacing: 2 }}>CINEPLEX</Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {NAV_LINKS.map(link => (
              <Button key={link.label} sx={{ color: '#222', fontWeight: 700, fontSize: 16, textTransform: 'none' }}>{link.label}</Button>
            ))}
          </Box>
        </Box>
      </AppBar>
      {/* Hero Section */}
      {heroMovie && (
        <Box sx={{ position: 'relative', width: '100%', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0 }}>
          <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `linear-gradient(120deg, rgba(0,0,0,0.7) 60%, #fafbfc 100%), url(${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZE}${heroMovie.backdrop_path}) center/cover no-repeat`,
            zIndex: 1,
            filter: 'blur(0px)',
          }} />
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'left', py: 8, px: 6, maxWidth: 1200, width: '100%' }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, color: '#fff', textShadow: '0 2px 16px #000a' }}>
              {heroMovie.title}
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', mb: 2, textShadow: '0 2px 8px #000a' }}>
              {(heroMovie.genre_ids || []).map(id => genres.find(g => g.id === id)?.name).filter(Boolean).join(', ')}
            </Typography>
            <Button variant="contained" startIcon={<PlayArrowIcon />} sx={{
              mt: 2,
              fontWeight: 700,
              fontSize: 18,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #e53935 0%, #e35d5b 100%)',
              color: '#fff',
              boxShadow: '0 2px 16px #e5393544',
              textTransform: 'none',
            }}>
              Watch Me
            </Button>
          </Box>
        </Box>
      )}
      {/* Featured Carousel */}
      {carouselMovies.length > 0 && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: -8, mb: 6, zIndex: 3, position: 'relative' }}>
          <Box sx={{ display: 'flex', gap: 4, px: 2, overflowX: 'auto', maxWidth: 1200 }}>
            {carouselMovies.map(movie => (
              <Card key={movie.id} sx={{
                minWidth: 220,
                maxWidth: 220,
                height: 320,
                borderRadius: 4,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                background: '#fff',
              }}>
                <CardMedia
                  component="img"
                  image={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                  alt={movie.title}
                  sx={{ width: 220, height: 300, objectFit: 'cover' }}
                />
                <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', bgcolor: 'rgba(0,0,0,0.55)', color: '#fff', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{movie.title}</Typography>
                </CardContent>
                <Box sx={{ position: 'absolute', top: 12, right: 12, bgcolor: '#e53935', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>•</Box>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      {/* Tabs for Categories */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} centered textColor="secondary" indicatorColor="secondary" sx={{
          '& .MuiTabs-indicator': { backgroundColor: '#e53935', height: 4, borderRadius: 2 },
        }}>
          {CATEGORY_TABS.map(t => (
            <Tab key={t.value} label={t.label} value={t.value} sx={{ fontWeight: 700, fontSize: 16, color: tab === t.value ? '#e53935' : '#222', textTransform: 'none' }} />
          ))}
        </Tabs>
      </Box>
      {/* Search Bar */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 4 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#fff', borderRadius: 32, boxShadow: '0 2px 12px #e5393522', padding: '6px 24px', minWidth: 320, maxWidth: 480, width: '100%' }}>
          <TextField
            placeholder="Search ..."
            variant="standard"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{ disableUnderline: true, style: { fontSize: 18, color: '#222', background: 'transparent' } }}
            sx={{ flex: 1, fontSize: 18, background: 'transparent' }}
          />
          <IconButton type="submit" sx={{ color: '#e53935', fontSize: 28 }}>
            <SearchIcon />
          </IconButton>
        </form>
      </Box>
      {/* Movie Grid */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 8 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : movies.length === 0 ? (
            <Typography sx={{ ml: 2 }}>No movies found.</Typography>
          ) : movies.map(movie => (
            <Grid item xs={12} sm={6} md={3} key={movie.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{
                bgcolor: '#fff',
                borderRadius: 4,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                width: 220,
                minWidth: 220,
                maxWidth: 220,
                height: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '&:hover': {
                  transform: 'scale(1.04)',
                  boxShadow: '0 16px 40px 0 rgba(31, 38, 135, 0.18)',
                },
              }}>
                <CardMedia
                  component="img"
                  image={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                  alt={movie.title}
                  sx={{
                    width: 220,
                    height: 280,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent sx={{ textAlign: 'center', color: '#222', p: 2, width: '100%', flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#888', fontSize: 14, mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {(movie.genre_ids || []).map(id => genres.find(g => g.id === id)?.name).filter(Boolean).join(', ')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home; 