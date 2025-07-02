import { Typography, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material'

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
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar src={user.avatar} sx={{ width: 64, height: 64, mr: 2 }} />
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">{user.bio}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>Latest Reviews</Typography>
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
    </Box>
  )
}

export default Profile 