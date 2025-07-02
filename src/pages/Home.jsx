import { Typography, Box, Card, CardContent, CardMedia, Grid } from '@mui/material'
import { css } from '@emotion/react'

const heroStyle = css`
  background: linear-gradient(90deg, #2196f3 0%, #21cbf3 100%);
  color: white;
  padding: 40px 0;
  text-align: center;
  border-radius: 8px;
`

const sampleMovies = [
  {
    id: 1,
    title: 'Inception',
    poster: 'https://m.media-amazon.com/images/I/51s+z1p5pDL._AC_SY679_.jpg',
    year: 2010,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster: 'https://m.media-amazon.com/images/I/51k0qa6qH-L._AC_SY679_.jpg',
    year: 2008,
  },
  {
    id: 3,
    title: 'Interstellar',
    poster: 'https://m.media-amazon.com/images/I/71n58Yhj2GL._AC_SY679_.jpg',
    year: 2014,
  },
  {
    id: 4,
    title: 'La La Land',
    poster: 'https://m.media-amazon.com/images/I/81r+LNw2Q-L._AC_SY679_.jpg',
    year: 2016,
  },
]

function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'SF Pro Display, Arial, sans-serif', py: 4 }}>
      <Box sx={{ width: '100%', maxWidth: 900, mb: 4, mx: 'auto', background: '#fff', borderRadius: 6, boxShadow: 3, p: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 700, color: '#222' }}>
          Welcome to Letterboxd Clone
        </Typography>
        <Typography variant="h6" align="center" sx={{ color: '#555' }}>
          Discover, review, and track your favorite movies!
        </Typography>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', background: '#fff', borderRadius: 6, boxShadow: 2, p: 3 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600, color: '#222' }}>All Movies</Typography>
        <Grid container spacing={4} justifyContent="center">
          {sampleMovies.map(movie => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card sx={{ height: 420, display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 5, overflow: 'hidden', background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)' }}>
                <CardMedia
                  component="img"
                  height="320"
                  image={movie.poster}
                  alt={movie.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', color: '#222' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{movie.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{movie.year}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Home 