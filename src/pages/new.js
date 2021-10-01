import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, InputLabel } from '@material-ui/core'
import { thesisSchema } from 'common/utils/constants'
import { addFile } from 'modules/theses/fetch-theses'
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
    console.log('SUBMIT')
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

      <form>
        <Box>
          <InputLabel
            error={!!errors.file} // convert truethy falsy to bool
            style={{ margin: '0 0 15px 0' }}
            required
          >
            Tải luận văn
          </InputLabel>

          <input {...register('file')} accept=".pdf" type="file" />

          <p style={{ color: '#ef5350' }}>{errors.file?.message}</p>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Đăng
          </Button>
        </Box>
      </form>
    </>
  )
}

/*
 user_id (session)
 name: text
 type: dropdown/text
 faculty: text
 published_year: number
 
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
 language: dropdown/text
 format:
 file upload
*/
