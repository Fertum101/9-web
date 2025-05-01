import { useState } from 'react'
import { Box, Typography, Paper, Tabs, Tab, CircularProgress, Alert } from '@mui/material'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import { useSelector } from 'react-redux'

const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0)
  const { loading, error } = useSelector(state => state.auth)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, width: 400, position: 'relative' }}>
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)',
            zIndex: 1
          }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>

        {tabValue === 0 ? (
          <>
            <Typography variant="h5" sx={{ mb: 3 }}>Вход в систему</Typography>
            <LoginForm />
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 3 }}>Регистрация</Typography>
            <RegisterForm />
          </>
        )}
      </Paper>
    </Box>
  )
}

export default AuthPage
