import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem } from '@material-ui/core'
import SelectController from 'common/components/input/SelectController'
import TextFieldController from 'common/components/input/TextFieldController'
import { thesisSchema } from 'common/utils/constants'
import UploadPDF from 'modules/theses/pdf/UploadPDF'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

export default function NewThesis() {
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

      <h1>Thêm luận văn mới</h1>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <UploadPDF name="file" register={register} errors={errors} />

        <TextFieldController
          name="name"
          label="Tên luận văn"
          defaultValue="abc"
          required={true}
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="published_year"
          label="Năm"
          type="number"
          defaultValue={2021}
          required={true}
          control={control}
          errors={errors}
        />

        <SelectController
          name="type"
          control={control}
          errors={errors}
          required={true}
        >
          <MenuItem value="KLTN">Khóa luận tốt nghiệp</MenuItem>
          <MenuItem value="ĐACN">Đồ án chuyên ngành</MenuItem>
        </SelectController>

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
 name*: text
 type*: dropdown
 faculty*: dropdown
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
 language*: dropdown
 file*
*/
