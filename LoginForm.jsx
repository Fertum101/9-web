import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/slices/authSlice'

const LoginForm = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Некорректный email').required('Обязательное поле'),
      password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле')
    }),
    onSubmit: async (values) => {
      await dispatch(loginUser(values))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          label="Пароль"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button 
          type="submit" 
          variant="contained" 
          disabled={formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          Войти
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm
