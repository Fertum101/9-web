import { Typography, Box, Paper } from '@mui/material'

const HomePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Добро пожаловать!</Typography>
        <Typography variant="body1">
          Главная страница
        </Typography>
      </Paper>
    </Box>
  )
}

export default HomePage
