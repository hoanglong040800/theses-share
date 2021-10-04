import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem } from '@material-ui/core'
import AutocompleteController from 'common/components/input/AutocompleteController'
import SelectController from 'common/components/input/SelectController'
import TextFieldController from 'common/components/input/TextFieldController'
import { thesisSchema } from 'common/utils/constants'
import { fetchAllTags } from 'modules/theses/fetch-tags'
import UploadPDF from 'modules/theses/pdf/UploadPDF'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

export async function getServerSideProps() {
  return {
    props: {
      tagsOptions: await fetchAllTags(process.env.API_URL),
    },
  }
}

export default function NewThesis({ tagsOptions }) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(thesisSchema),
  })

  async function onSubmit(data) {
    console.log('SUBMIT', data)
    // await addFile('', 1, data.file[0])
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

        <AutocompleteController
          name="tags"
          label="Tags"
          options={tagsOptions}
          optionLabel='name_en'
          required
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <TextFieldController
          name="name"
          label="Tên luận văn"
          defaultValue="abc"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="faculty"
          label="Khoa"
          defaultValue="KHMT"
          required
          control={control}
          errors={errors}
        >
          <MenuItem value="KHMT">Khoa học máy tính</MenuItem>
          <MenuItem value="CNPM">Công nghệ phần mềm</MenuItem>
          <MenuItem value="KTMT">Kĩ thuật máy tính</MenuItem>
        </SelectController>

        <TextFieldController
          name="published_year"
          label="Năm"
          type="number"
          defaultValue={2021}
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="type"
          label="Loại luận văn"
          defaultValue="KLTN"
          required
          control={control}
          errors={errors}
        >
          <MenuItem value="KLTN">Khóa luận tốt nghiệp</MenuItem>
          <MenuItem value="ĐACN">Đồ án chuyên ngành</MenuItem>
        </SelectController>

        <SelectController
          name="language"
          label="Ngôn ngữ"
          control={control}
          errors={errors}
        >
          <MenuItem value="vn">Tiếng Việt</MenuItem>
          <MenuItem value="en">Tiếng Anh</MenuItem>
        </SelectController>

        <SelectController
          name="format"
          label="Định dạng"
          defaultValue="pdf"
          control={control}
          errors={errors}
        >
          <MenuItem value="pdf">PDF</MenuItem>
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

/*
 user_id (session)
 name*: text x
 type*: dropdown x
 faculty*: dropdown x
 published_year*: number
 
 tags: [
  { id: 1, name_vn: 'Học sâu'},
  { id: 2, name_vn: 'Máy học'},
 ]

tags:[
  id: 1,
  id: 2,
]

 author: array
 teachers: array
 language: dropdown x
 format: dropdown x
 file*
*/
