import { List, ListItem, ListItemText, Paper, Typography, Avatar, ListItemAvatar, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { deleteFeedback } from '../../store/slices/feedbackSlice'

const FeedbackList = ({ items }) => {
  const dispatch = useDispatch()

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Последние отзывы</Typography>

      {items.length === 0 ? (
        <Typography variant="body1">Пока нет отзывов</Typography>
      ) : (
        <List>
          {items.map(item => (
            <ListItem key={item.id} divider
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteFeedback(item.id))}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>{item.author?.charAt(0)?.toUpperCase() || 'A'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.text}
                secondary={
                  <>
                    <Typography component="span" display="block">
                      {item.author || 'Аноним'}
                    </Typography>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default FeedbackList
