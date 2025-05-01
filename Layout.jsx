import Header from './Header'
import BottomNav from './BottomNav'
import { Box } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 56px - 56px)', p: 2 }}>
        {children}
      </Box>
      <BottomNav />
    </>
  )
}

export default Layout
