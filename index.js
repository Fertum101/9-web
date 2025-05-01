import { configureStore } from '@reduxjs/toolkit'
import { feedbacksApi } from './api/feedbacksApi'
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import adminReducer from './slices/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    admin: adminReducer,
    [feedbacksApi.reducerPath]: feedbacksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedbacksApi.middleware),
})
