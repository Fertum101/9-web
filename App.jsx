import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import FeedbackPage from './pages/FeedbackPage'
import AuthPage from './pages/AuthPage'
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import Lab5Page from './pages/Lab5Page'
import Lab6Page from './pages/Lab6Page'
import Lab7Page from './pages/Lab7Page'
import AdminPage from './pages/AdminPage'

function App() {
  const { isLoggedIn, user } = useSelector(state => state.auth)
  const { darkMode } = useSelector(state => state.theme)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/lab5" element={<Lab5Page />} />
            <Route path="/lab6" element={<Lab6Page />} />
            <Route path="/lab7" element={<Lab7Page />} />
            <Route path="/admin" element={user?.role === 'admin' ? <AdminPage /> : <HomePage />} />
          </Routes>
        </Layout>
      ) : (
        <AuthPage />
      )}
    </ThemeProvider>
  )
}

export default App
