export const TMDB_API_KEY = 'cbca8f48e99f661bca6114fe5bcd4d4b';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes for tmdb
export const BACKDROP_SIZE = 'w1280';
export const POSTER_SIZE = 'w500';

export const TMDB_API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmNhOGY0OGU5OWY2NjFiY2E2MTE0ZmU1YmNkNGQ0YiIsIm5iZiI6MTc1MTQ3Mzk5My4wNDgsInN1YiI6IjY4NjU1ZjQ5OGFiYzc1MTlkMTc4NDFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vf00PLL8VxIvBmGslUA66EdkR4jSKIT0x2rSdNyXAiY'
  }
};

// Fetch popular movies
export async function fetchPopularMovies(page = 1) {
  const url = `${TMDB_BASE_URL}/movie/popular?page=${page}`;
  const res = await fetch(url, TMDB_API_OPTIONS);
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
}

// Search movies by query
export async function searchMovies(query, page = 1) {
  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url, TMDB_API_OPTIONS);
  if (!res.ok) throw new Error('Failed to search movies');
  return res.json();
}

// Fetch genres
export async function fetchGenres() {
  const url = `${TMDB_BASE_URL}/genre/movie/list`;
  const res = await fetch(url, TMDB_API_OPTIONS);
  if (!res.ok) throw new Error('Failed to fetch genres');
  return res.json();
}

// Fetch trending movies
export async function fetchTrendingMovies(timeWindow = 'day', page = 1) {
  // timeWindow can be 'day' or 'week'
  const url = `${TMDB_BASE_URL}/trending/movie/${timeWindow}?page=${page}`;
  const res = await fetch(url, TMDB_API_OPTIONS);
  if (!res.ok) throw new Error('Failed to fetch trending movies');
  return res.json();
} 