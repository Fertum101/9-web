import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addFeedback } from '../../store/slices/feedbackSlice'

const FeedbackForm = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .min(10, 'Минимум 10 символов')
        .required('Обязательное поле')
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(addFeedback({
        text: values.message,
        date: new Date().toLocaleString(),
        author: user.name || user.email,
        email: user.email
      }))
      resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Ваш отзыв"
          name="message"
          multiline
          rows={4}
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={formik.isSubmitting}
        >
          Отправить
        </Button>
      </Box>
    </form>
  )
}

export default FeedbackForm
