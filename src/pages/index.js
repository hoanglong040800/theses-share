import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Button, makeStyles } from '@material-ui/core'

export default function Home() {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <h1>Home</h1>

      <Box className={classes.box}>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/')}
          >
            Home
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push('/about')}
          >
            About
          </Button>
        </div>
      </Box>
    </>
  )
}

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})
