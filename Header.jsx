import { AppBar, Toolbar, IconButton, Typography, Switch, Drawer, List, ListItem, ListItemText, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/slices/themeSlice'
import UserProfile from './UserProfile'

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const dispatch = useDispatch()
  const { darkMode } = useSelector(state => state.theme)

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Мои Лабораторные
          </Typography>

          <Switch checked={darkMode} onChange={() => dispatch(toggleTheme())} />
          <UserProfile small />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Главная" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemText primary="О себе" />
            </ListItem>
            <ListItem button component={Link} to="/lab5">
              <ListItemText primary="Лабораторная 5" />
            </ListItem>
            <ListItem button component={Link} to="/lab6">
              <ListItemText primary="Лабораторная 6" />
            </ListItem>
            <ListItem button component={Link} to="/lab7">
              <ListItemText primary="Лабораторная 7" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
