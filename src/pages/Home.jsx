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
    <Box>
      <Box css={heroStyle}>
        <Typography variant="h3" gutterBottom>
          Welcome to Letterboxd Clone
        </Typography>
        <Typography variant="h6">
          Discover, review, and track your favorite movies!
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>All Movies</Typography>
        <Grid container spacing={3}>
          {sampleMovies.map(movie => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="350"
                  image={movie.poster}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
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