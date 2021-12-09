import { Box, Button, Divider, MenuItem } from '@material-ui/core'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useForm } from 'react-hook-form'
import { getUserByUsername, updateUserProfile } from 'modules/user/fetch-users'
import { fetchAllMajors } from 'modules/fetch-common'
import TextFieldController from 'common/components/input/TextFieldController'
import SelectController from 'common/components/input/SelectController'
import AlertSnackbarCustom from 'common/components/AlertSnackbarCustom'
import { useState } from 'react'
import { snackbarCaseMessages } from 'common/utils/constants'

export async function getServerSideProps(ctx) {
  const apiUrl = process.env.API_URL
  const session = await getSession(ctx)
  const defaultValues = await getUserByUsername(apiUrl, session.user.user_name)
  const allMajors = await fetchAllMajors(apiUrl)

  if (!defaultValues || !allMajors) {
    return {
      notFound: true,
    }
  }

  return { props: { session, apiUrl, defaultValues, allMajors } }
}

export default function EditProfile({
  session,
  apiUrl,
  defaultValues,
  allMajors,
}) {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      email: defaultValues.email || '',
      full_name: defaultValues.full_name || '',
      gender: defaultValues.gender || '',
      age: defaultValues.age || 0,
      university:
        defaultValues.university || 'Trường Đại học Công nghệ thông tin',
      major_id: defaultValues.major.id || 1,
      academic_year: defaultValues.academic_year || 0,
    },
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarProps, setSnackbarProps] = useState({
    action: '',
    severity: '',
    message: '',
  })

  async function onSubmit(data) {
    data.age = +data.age
    data.academic_year = +data.academic_year

    const status = await updateUserProfile(apiUrl, session.user.user_name, data)
    status
      ? setSnackbarProps(snackbarCaseMessages.editProfileSuccess)
      : setSnackbarProps(snackbarCaseMessages.editProfileError)

    setOpenSnackbar(true)
  }

  function onError(errors) {
    console.clear()
    console.log({ errors })
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false)

    snackbarProps.severity === 'success' &&
      router.push(`/${session.user.user_name}`)
  }

  return (
    <>
      <Head>
        <title>Chỉnh sửa hồ sơ</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Chỉnh sửa hồ sơ</h1>

        <Divider />

        <Box display="flex" flexDirection="column" mx="auto" maxWidth="400px">
          <TextFieldController
            name="email"
            label="Email"
            required
            control={control}
            errors={errors}
          />

          <TextFieldController
            name="full_name"
            label="Họ và tên"
            control={control}
            errors={errors}
          />

          <SelectController
            name="gender"
            label="Giới tính"
            control={control}
            errors={errors}
          >
            <MenuItem value="male">Nam</MenuItem>
            <MenuItem value="female">Nữ</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </SelectController>

          <TextFieldController
            name="age"
            label="Tuổi"
            type="number"
            control={control}
            errors={errors}
          />

          <SelectController
            name="university"
            label="Trường"
            control={control}
            errors={errors}
          >
            <MenuItem value="Trường Đại học Công nghệ thông tin">
              Trường Đại học công nghệ thông tin
            </MenuItem>
          </SelectController>

          <SelectController
            name="major_id"
            label="Ngành"
            control={control}
            errors={errors}
          >
            {
              //
              allMajors.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name_vn}
                </MenuItem>
              ))
            }
          </SelectController>

          <TextFieldController
            name="academic_year"
            label="Năm học"
            type="number"
            control={control}
            errors={errors}
          />

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit, onError)}
            >
              Sửa thông tin
            </Button>
          </Box>
        </Box>
      </SettingsTabs>

      <AlertSnackbarCustom
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarProps.severity}
        message={snackbarProps.message}
      />
    </>
  )
}

EditProfile.auth = true
