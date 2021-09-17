import { Box, makeStyles } from '@material-ui/core'
import { colDef, rowsDummy } from 'common/utils/constants'
import { fetchNewestTheses } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import Link from 'next/link'

export async function getStaticProps() {
  const newestTheses = await fetchNewestTheses(process.env.API_URL)

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

      <Box my={8}>
        <Link href="/theses/newest">
          <a>
            <h1 className={mui.link}>Luận văn mới nhất</h1>
          </a>
        </Link>

        <Box mt={3}>
          <ThesesTable columns={colDef} rows={newestTheses} />
        </Box>
      </Box>

      <Box my={8}>
        <Link href="/theses/most-views">
          <a>
            <h1 className={mui.link}>Luận văn xem nhiều</h1>
          </a>
        </Link>

        <Box my={3}>
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
