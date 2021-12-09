import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, MenuItem, Slide, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AutocompleteController from 'common/components/input/AutocompleteController'
import SelectController from 'common/components/input/SelectController'
import TextFieldController from 'common/components/input/TextFieldController'
import { editThesisSchema } from 'common/utils/validation-schema'
import { getNameFromEmail } from 'common/utils/util'
import { fetchAllFaculties, fetchAllTags } from 'modules/fetch-common'
import {
  fetchThesisBySlug,
  updateThesisInfor,
} from 'modules/theses/fetch-theses'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  // --- handle routing error ----

  // check is [email] match with user
  if (ctx.params.user_name !== getNameFromEmail(session.user.email))
    return {
      notFound: true,
    }

  const details = await fetchThesisBySlug(process.env.API_URL, ctx.params.slug)

  if (!details)
    return {
      notFound: true,
    }
  // check is thesis belong to user
  else if (session.user.id !== details.user.id)
    return {
      notFound: true,
    }

  const tagsOptions = await fetchAllTags(process.env.API_URL)
  const facultiesOptions = await fetchAllFaculties(process.env.API_URL)

  if (!facultiesOptions || !tagsOptions)
    return {
      notFound: true,
    }

  return {
    props: {
      apiUrl: process.env.API_URL,
      session,
      details,
      facultiesOptions,
      tagsOptions,
    },
  }
}

export default function EditThesis({
  apiUrl,
  session,
  details,
  facultiesOptions,
  tagsOptions,
}) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [severity, setSeverity] = useState('success')
  const router = useRouter()

  const {
    watch,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(editThesisSchema),
    defaultValues: {
      name: details.name,
      faculty_id: details.faculty.id,
      published_year: details.published_year,
      tags: details.tags, // must update UI by set defaultValue for Autocomplete
      type: details.type,
      language: details.language,
      format: details.format,
      authors: details.authors,
      teachers: details.teachers,
    },
  })

  // Snackbar
  function handleCloseSnackbar() {
    setOpenSnackbar(false)

    if (severity === 'success') {
      const slug = slugify(watch('name'))
      const nameEmail = getNameFromEmail(session.user.email)

      reset('', {
        keepValues: false,
      })

      router.push(`/${nameEmail}/${slug}`)
    }
  }

  async function onSubmit(data) {
    data['slug'] = slugify(data['name'])
    console.log('SUBMIT', data)

    // console.log('SUBMIT', data)
    // let status = true
    const status = await updateThesisInfor(
      apiUrl,
      data,
      session.user.id,
      details.id
    )

    status ? setSeverity('success') : setSeverity('error')
    setOpenSnackbar(true)
  }

  function onError(err) {
    console.log('ERROR\n', err)
  }

  return (
    <>
      <Head>
        <title>Chỉnh sửa luận văn</title>
      </Head>

      <h1>Chỉnh sửa luận văn</h1>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <TextFieldController
          name="name"
          label="Tên luận văn"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="faculty_id"
          label="Khoa"
          required
          control={control}
          errors={errors}
        >
          {facultiesOptions.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name_vn}
            </MenuItem>
          ))}
        </SelectController>

        <TextFieldController
          name="published_year"
          label="Năm"
          type="number"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="type"
          label="Loại luận văn"
          required
          control={control}
          errors={errors}
        >
          <MenuItem value="KLTN">Khóa luận tốt nghiệp</MenuItem>
          <MenuItem value="ĐACN">Đồ án chuyên ngành</MenuItem>
        </SelectController>

        <Box mt={2}>
          <AutocompleteController
            name="tags"
            label="Tags"
            options={tagsOptions}
            optionLabel="name_vn"
            defaultValue={details.tags}
            required
            control={control}
            errors={errors}
            setValue={setValue}
          />
        </Box>

        <SelectController
          name="format"
          label="Định dạng"
          control={control}
          errors={errors}
        >
          <MenuItem value="PDF">PDF</MenuItem>
        </SelectController>

        <SelectController
          name="language"
          label="Ngôn ngữ"
          control={control}
          errors={errors}
        >
          <MenuItem value="VN">Tiếng Việt</MenuItem>
          <MenuItem value="EN">Tiếng Anh</MenuItem>
        </SelectController>

        <TextFieldController
          name="authors"
          label="Tác giả"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="teachers"
          label="Giảng viên hướng dẫn"
          control={control}
          errors={errors}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Chỉnh sửa
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
            ? 'Chỉnh sửa luận văn thành công. Đang điều hướng đến trang chi tiết'
            : 'Có lỗi xảy ra khi chỉnh sửa. Vui lòng thử lại lần sau.'}
        </Alert>
      </Snackbar>
    </>
  )
}

EditThesis.auth = true
