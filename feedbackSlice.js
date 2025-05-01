import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001/feedback'

export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async () => {
  const response = await axios.get(API_URL)
  return response.data
})

export const addFeedback = createAsyncThunk('feedback/addFeedback', async (newFeedback) => {
  const response = await axios.post(API_URL, newFeedback)
  return response.data
})

export const deleteFeedback = createAsyncThunk('feedback/deleteFeedback', async (id) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
})

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
  }
})

export default feedbackSlice.reducer
