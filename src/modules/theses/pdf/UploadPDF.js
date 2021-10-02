import { Box, InputLabel } from '@material-ui/core'

export default function UploadPDF({ name = 'file', register, errors }) {
  return (
    <Box my={3} display="flex" flexDirection="column" mx="auto">
      <InputLabel
        error={!!errors[name]} // convert truthy falsy to bool
        style={{ margin: '0 0 15px 0' }}
        required
      >
        Tải luận văn
      </InputLabel>

      <input {...register(name)} accept=".pdf" type="file" />

      <p style={{ color: '#ef5350' }}>{errors[name]?.message}</p>
    </Box>
  )
}
