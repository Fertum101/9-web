import { Avatar, Button, Menu, MenuItem, Typography, Box, Divider, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, updateUser } from '../store/slices/authSlice'

const UserProfile = ({ small = false }) => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditProfile = () => {
    setEditDialogOpen(true)
    handleClose()
  }

  const handleSaveProfile = () => {
    dispatch(updateUser({ ...user, ...formData }))
    setEditDialogOpen(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!user) return null

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        onClick={handleMenuOpen}
        startIcon={
          <Avatar sx={{ width: small ? 32 : 40, height: small ? 32 : 40, bgcolor: 'primary.main' }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
        }
        sx={{ textTransform: 'none', color: 'inherit' }}
      >
        {!small && (
          <Typography variant="body1" sx={{ ml: 1 }}>
            {user?.name || (user?.email || 'Пользователь')}
          </Typography>
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { width: 250, p: 1 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.name || 'Пользователь'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email || ''}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleEditProfile}>
          Редактировать профиль
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleClose()
            dispatch(logout())
          }}
          sx={{ color: 'error.main' }}
        >
          Выйти
        </MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Редактировать профиль</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleSaveProfile} variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserProfile
