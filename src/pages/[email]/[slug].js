import { Box, CircularProgress } from '@material-ui/core'
import {
  fetchNewestTheses,
  fetchThesisBySlug,
} from 'modules/theses/fetch-theses'
import Head from 'next/head'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const data = await fetchNewestTheses(process.env.API_URL)

  const paths = data.map(item => {
    return {
      params: {
        email: item.user.email,
        slug: item.slug,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      details: await fetchThesisBySlug(process.env.API_URL, params.slug),
    },
  }
}

export default function ThesisDetail({ details }) {
  const router = useRouter()

  // cho trang fetch du lieu -> hien thi component loading
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Chi tiết luận văn | Theses Share</title>
        </Head>

        <Box display="flex" justifyContent="center" my={15}>
          <CircularProgress size={50} />
        </Box>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{details.name} | Theses Share</title>
      </Head>

      <h1>Chi tiết luận văn</h1>
      <pre>{JSON.stringify(details, 0, 2)}</pre>
    </>
  )
}
