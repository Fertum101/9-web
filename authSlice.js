import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001/users'

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await axios.get(`${API_URL}?email=${credentials.email}&password=${credentials.password}`)
  if (response.data.length === 0) throw new Error('Неверный email или пароль')
  if (response.data[0].blocked) throw new Error('Пользователь заблокирован')
  return response.data[0]
})

export const registerUser = createAsyncThunk('auth/registerUser', async (newUser) => {
  const userWithRole = { ...newUser, role: 'user', blocked: false }
  const response = await axios.post(API_URL, userWithRole)
  return response.data
})


export const updateUser = createAsyncThunk('auth/updateUser', async (user) => {
  const response = await axios.put(`${API_URL}/${user.id}`, user)
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isLoggedIn = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
