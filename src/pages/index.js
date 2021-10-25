import { Box, makeStyles } from '@material-ui/core'
import { colDef } from 'common/utils/constants'
import { fetchNewestTheses } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import Link from 'next/link'

export async function getServerSideProps() {
  const numOfTheses = 10
  const newestTheses = await fetchNewestTheses(process.env.API_URL)

  if (!newestTheses) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      newestTheses,
    },
  }
}

export default function Home({ newestTheses }) {
  const mui = useStyles()

  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <h1>Trang chủ</h1>

      <Box my={6}>
        <Link href="/newest">
          <a>
            <h2 className={mui.link}>Luận văn mới nhất</h2>
          </a>
        </Link>

        <Box mt={3}>
          <ThesesTable columns={colDef} rows={newestTheses} />
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles({
  link: {
    display: 'inline',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
