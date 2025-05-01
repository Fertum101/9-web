import { Box, CircularProgress, Paper, Typography, Alert } from '@mui/material'
import FeedbackForm from '../components/Feedback/FeedbackForm'
import FeedbackList from '../components/Feedback/FeedbackList'
import { useSelector } from 'react-redux'
import {
  useGetFeedbacksQuery,
  useAddFeedbackMutation,
} from '../store/api/feedbacksApi'

const FeedbackPage = () => {
  const { user } = useSelector((state) => state.auth)
  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetFeedbacksQuery()
  
  const [addFeedback] = useAddFeedbackMutation()

  const handleSubmit = async (feedback) => {
    const newFeedback = {
      text: feedback.message,
      date: new Date().toLocaleString(),
      author: user.name || user.email.split('@')[0],
      email: user.email,
    }
  
    try {
      await addFeedback(newFeedback).unwrap()
      refetch()
    } catch (err) {
      console.error('Ошибка при добавлении:', err)
    }
  }
  

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="h4" gutterBottom>Обратная связь</Typography>

      {isLoading && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Alert severity="error">Ошибка загрузки отзывов</Alert>
      )}

      {!isLoading && !isError && (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <FeedbackForm onSubmit={handleSubmit} />
          </Paper>

          <FeedbackList items={data || []} />
        </>
      )}
    </Box>
  )
}

export default FeedbackPage
