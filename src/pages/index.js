import { Box, makeStyles } from '@material-ui/core'
import { colDef } from 'common/utils/constants'
import { fetchMostViewsTheses, fetchNewestTheses } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import Link from 'next/link'

// khi page được build
export async function getStaticProps() {
  const newestTheses = await fetchNewestTheses(process.env.API_URL)

  // chay ham fetch trong file fetch-theses.js
  const mostViewsTheses = await fetchMostViewsTheses(process.env.API_URL)

  return {
    props: {
      newestTheses,
      mostViewsTheses // truyen du lieu vao props cho trang
    },
  }
}

export default function Home({ newestTheses, mostViewsTheses }) {
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
          <ThesesTable columns={colDef} rows={mostViewsTheses} />
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
