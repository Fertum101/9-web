import { Container, Box, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import UserProfile from '../components/UserProfile'
import FeedbackPage from './FeedbackPage'
import HomePage from './HomePage'

const MainPage = () => {
  const [tabValue, setTabValue] = useState(0)

  return (
    <Container>
      <UserProfile />

      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Главная" />
          <Tab label="Обратная связь" />
        </Tabs>

        {tabValue === 0 ? <HomePage /> : <FeedbackPage />}
      </Box>
    </Container>
  )
}

export default MainPage
