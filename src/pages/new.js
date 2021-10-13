import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem } from '@material-ui/core'
import AutocompleteController from 'common/components/input/AutocompleteController'
import SelectController from 'common/components/input/SelectController'
import TextFieldController from 'common/components/input/TextFieldController'
import { thesisSchema } from 'common/utils/constants'
import { fetchAllFaculties, fetchAllTags } from 'modules/fetch-common'
import { addFile, addThesisInfor } from 'modules/theses/fetch-theses'
import UploadPDF from 'modules/theses/pdf/UploadPDF'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { getSession } from 'next-auth/client'

export async function getServerSideProps(ctx) {
  const session = getSession(ctx)
  const tagsOptions = await fetchAllTags(process.env.API_URL)
  const facultiesOptions = await fetchAllFaculties(process.env.API_URL)

  if (tagsOptions === false || facultiesOptions === false) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      tagsOptions,
      session,
      facultiesOptions,
      apiUrl: process.env.API_URL,
    },
  }
}

export default function NewThesis({
  apiUrl,
  session,
  tagsOptions,
  facultiesOptions,
}) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(thesisSchema),
    defaultValues: {
      name: 'Phát triển ứng dụng di động',
      faculty_id: 1,
      published_year: 2021,
      type: 'KLTN',
      tags: [],
      format: 'PDF',
      authors: '',
      teachers: '',
    },
  })

  async function onSubmit(data) {
    console.log('SUBMIT', data)
    data['slug'] = slugify(data['name'])

    // const thesis_id = await addThesisInfor(apiUrl, data, session.user.id)

    const result = await addFile(apiUrl, data.file[0], 1, 6)
    console.log('-- result --', result)
  }

  function onError(err) {
    console.log('ERROR\n', err)
  }

  return (
    <>
      <Head>
        <title>Thêm luận văn mới</title>
      </Head>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <UploadPDF name="file" register={register} errors={errors} />

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
            optionLabel="name_en"
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
            Đăng
          </Button>
        </Box>
      </Box>
    </>
  )
}

NewThesis.auth = true
