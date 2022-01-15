import { Box, Button, Divider } from '@material-ui/core'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useForm } from 'react-hook-form'
import { rsPswdSchema } from 'common/utils/validation-schema'
import TextFieldController from 'common/components/input/TextFieldController'
import { getSession } from 'next-auth/client'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  return { props: { session } }
}

export default function ChangePassword() {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(rsPswdSchema),
  })

  function onSubmit(data) {

  }

  function onError(err) {
    console.log('onError', err)
  }

  return (
    <>
      <Head>
        <title>Đổi mật khẩu</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Đổi mật khẩu</h1>

        <Divider />

        <Box display="flex" flexDirection="column" mx="auto" maxWidth="400px">
          <TextFieldController
            name="pswdOld"
            label="Mật khẩu cũ"
            type="password"
            required={true}
            control={control}
            errors={errors}
          />

          <TextFieldController
            name="pswdNew"
            label="Mật khẩu mới"
            type="password"
            required={true}
            control={control}
            errors={errors}
          />

          <TextFieldController
            name="pswdCf"
            label="Xác nhận mật khẩu mới"
            type="password"
            required={true}
            control={control}
            errors={errors}
          />

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit, onError)}
            >
              Đổi mật khẩu
            </Button>
          </Box>
        </Box>
      </SettingsTabs>
    </>
  )
}

ChangePassword.auth = true
