const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const fetch = require('node-fetch');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Placeholder route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', authRoutes);

const TMDB_API_KEY = 'cbca8f48e99f661bca6114fe5bcd4d4b';
const TMDB_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmNhOGY0OGU5OWY2NjFiY2E2MTE0ZmU1YmNkNGQ0YiIsIm5iZiI6MTc1MTQ3Mzk5My4wNDgsInN1YiI6IjY4NjU1ZjQ5OGFiYzc1MTlkMTc4NDFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vf00PLL8VxIvBmGslUA66EdkR4jSKIT0x2rSdNyXAiY';

app.get('/api/tmdb/popular', async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?page=1`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
});

// Trending movies
app.get('/api/tmdb/trending', async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/day?page=1`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

// Genres
app.get('/api/tmdb/genres', async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Upcoming movies
app.get('/api/tmdb/upcoming', async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/upcoming?page=1`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upcoming movies' });
  }
});

// Top rated movies
app.get('/api/tmdb/top_rated', async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?page=1`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top rated movies' });
  }
});

// Search movies
app.get('/api/tmdb/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=1`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 