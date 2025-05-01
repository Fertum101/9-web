import { Box, Typography, Paper } from '@mui/material'

const Lab6Page = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Лабораторная работа №6</Typography>
        <Typography variant="body1">
          Страница с лабораторной работой номер 6.
        </Typography>
      </Paper>
    </Box>
  )
}

export default Lab6Page
