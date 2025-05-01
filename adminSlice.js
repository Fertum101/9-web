import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_USERS = 'http://localhost:3001/users'
const API_FEEDBACK = 'http://localhost:3001/feedback'

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const response = await axios.get(API_USERS)
  return response.data
})

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id) => {
  await axios.delete(`${API_USERS}/${id}`)
  return id
})

export const blockUser = createAsyncThunk('admin/blockUser', async (user) => {
  const updated = { ...user, blocked: !user.blocked }
  await axios.put(`${API_USERS}/${user.id}`, updated)
  return updated
})

export const fetchFeedbacksAdmin = createAsyncThunk('admin/fetchFeedbacksAdmin', async () => {
  const response = await axios.get(API_FEEDBACK)
  return response.data
})

export const deleteFeedbackAdmin = createAsyncThunk('admin/deleteFeedbackAdmin', async (id) => {
  await axios.delete(`${API_FEEDBACK}/${id}`)
  return id
})

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    feedbacks: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload)
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id)
        if (index !== -1) state.users[index] = action.payload
      })
      .addCase(fetchFeedbacksAdmin.fulfilled, (state, action) => {
        state.feedbacks = action.payload
      })
      .addCase(deleteFeedbackAdmin.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload)
      })
  }
})

export default adminSlice.reducer
