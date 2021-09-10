import { Box, Button } from '@material-ui/core'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <h1>Trang chủ</h1>

      <Box display="flex" justifyContent="space-evenly">
        <Button color="primary" size="large">
          Primary
        </Button>

        <Button color="secondary" size="large">
          Secondary
        </Button>

        <Button variant="contained" color="primary">
          Primary
        </Button>

        <Button variant="contained" color="secondary">
          Secondary
        </Button>
      </Box>
    </>
  )
}
