import { Box, Typography, Paper } from '@mui/material'

const Lab5Page = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Лабораторная работа №5</Typography>
        <Typography variant="body1">
          Страница с лабораторной работой номер 5.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Lab5Page
