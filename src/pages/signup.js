import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Slide, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import TextFieldController from 'common/components/input/TextFieldController'
import { signupSchema } from 'common/utils/constants'
import { fetchSignup } from 'modules/auth/fetch-auth'
import { getSession, signIn } from 'next-auth/client'
import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      apiUrl: process.env.API_URL,
      nextauthUrl: process.env.NEXTAUTH_URL,
    },
  }
}

export default function SignUp({ apiUrl, nextauthUrl }) {
  const {
    watch,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: 'abc@gmail.com',
      user_name: 'abc',
      password: '12345678',
      password_confirmation: '12345678',
    },
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [severity, setSeverity] = useState('success')

  function handleCloseSnackbar() {
    setOpenSnackbar(false)

    if (severity === 'success') {
      reset('', {
        keepValues: false,
      })

      // signIn('credentials', {
      //   email: watch('email'),
      //   password: watch('password'),
      // redirect: true,
      // callbackUrl: `${nextauthUrl}/settings/edit-profile`,
      // })
      signIn('credentials', {
        email: 'user1@gmail.com',
        password: '1',
        redirect: true,
        callbackUrl: `${nextauthUrl}/settings/edit-profile`,
      })
    }
  }

  function onSubmit(data) {
    // console.log('SUBMIT', data)

    // const status=fetchSignup(apiUrl,data)
    const status = true

    if (!status) {
      setSeverity('error')
    } else setSeverity('success')

    setOpenSnackbar(true)
  }

  function onError(error) {
    console.log('ERROR', error)
  }

  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <h1>Đăng ký</h1>

        <TextFieldController
          name="email"
          label="Email (đăng nhập)"
          required
          type="email"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="user_name"
          label="Username (hiển thị)"
          required
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="password"
          label="Mật khẩu"
          required
          // type="password"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="password_confirmation"
          label="Xác nhận mật khẩu"
          required
          // type="password"
          control={control}
          errors={errors}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Đăng ký
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={2500}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {severity === 'success'
            ? 'Đăng ký thành công. Đang đăng nhập...'
            : 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại lần sau.'}
        </Alert>
      </Snackbar>
    </>
  )
}
