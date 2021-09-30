import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography } from '@material-ui/core'
import { thesisSchema } from 'common/utils/constants'
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

  function onSubmit(data) {
    console.log('onSubmit')
    console.log(data)
  }

  function onError(err) {
    console.log('onError')
    console.log(err)
  }

  return (
    <>
      <Head>
        <title>Thêm luận văn mới</title>
      </Head>

      <h1>Thêm luận văn mới</h1>

      <form>
        <input {...register('file')} accept=".pdf" type="file" />
        <p style={{ color: '#d32f2f' }}>{errors.file?.message}</p>

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
