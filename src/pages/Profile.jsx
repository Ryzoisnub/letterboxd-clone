import { Typography, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Paper } from '@mui/material'

const user = {
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=3',
  bio: 'Movie enthusiast. Loves sci-fi and drama.',
}

const reviews = [
  {
    id: 1,
    movie: 'Inception',
    review: 'A mind-bending masterpiece! Nolan at his best.',
    date: '2023-06-01',
  },
  {
    id: 2,
    movie: 'La La Land',
    review: 'Beautiful music and visuals. A modern classic.',
    date: '2023-05-20',
  },
]

function Profile() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', fontFamily: 'SF Pro Display, Arial, sans-serif', py: 4 }}>
      <Paper elevation={4} sx={{ width: '100%', maxWidth: 500, p: 4, mb: 4, borderRadius: 6, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={user.avatar} sx={{ width: 64, height: 64, mr: 2 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#222' }}>{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.bio}</Typography>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ width: '100%', maxWidth: 500, p: 3, borderRadius: 6, boxShadow: 2 }}>
        <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 600, color: '#222' }}>Latest Reviews</Typography>
        <List>
          {reviews.map(r => (
            <ListItem key={r.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{r.movie[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={r.movie}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {r.review}
                    </Typography>
                    {` — ${r.date}`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default Profile 