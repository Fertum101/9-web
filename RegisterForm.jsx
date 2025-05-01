import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/slices/authSlice'

const RegisterForm = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Обязательное поле'),
      email: Yup.string().email('Некорректный email').required('Обязательное поле'),
      password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле')
    }),
    onSubmit: async (values) => {
      const { confirmPassword, ...newUser } = values
      await dispatch(registerUser(newUser))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Имя"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

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

        <TextField
          label="Подтвердите пароль"
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

        <Button 
          type="submit" 
          variant="contained" 
          disabled={formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </form>
  )
}

export default RegisterForm
