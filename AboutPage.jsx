import { Box, Typography, Paper } from '@mui/material'

const AboutPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>О себе</Typography>
        <Typography variant="body1">
          Страница о себе
        </Typography>
      </Paper>
    </Box>
  )
}

export default AboutPage
