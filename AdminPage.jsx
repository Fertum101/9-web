import { Box, Typography, Paper, Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import UsersTable from '../components/Admin/UsersTable'
import FeedbackAdminTable from '../components/Admin/FeedbackAdminTable'

const AdminPage = () => {
  const [tab, setTab] = useState(0)

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Панель администратора</Typography>

        <Tabs value={tab} onChange={(e, value) => setTab(value)} sx={{ mb: 2 }}>
          <Tab label="Пользователи" />
          <Tab label="Отзывы" />
        </Tabs>

        {tab === 0 && <UsersTable />}
        {tab === 1 && <FeedbackAdminTable />}
      </Paper>
    </Box>
  )
}

export default AdminPage
