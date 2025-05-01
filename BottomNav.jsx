import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import FeedbackIcon from '@mui/icons-material/Feedback'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

const BottomNav = () => {
  const navigate = useNavigate()

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Главная" icon={<HomeIcon />} onClick={() => navigate('/')} />
        <BottomNavigationAction label="Отзывы" icon={<FeedbackIcon />} onClick={() => navigate('/feedback')} />
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
