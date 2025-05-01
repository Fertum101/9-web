import { Box, Typography, Paper } from '@mui/material'

const Lab7Page = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Лабораторная работа №7</Typography>
        <Typography variant="body1">
          Страница с лабораторной работой номер 7.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Lab7Page
