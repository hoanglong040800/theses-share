import { Box, Button, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Loading from 'common/components/loading/Loading'
import {
  fetchNewestTheses,
  fetchNewestThesesJson,
  fetchThesisBySlug,
} from 'modules/theses/fetch-theses'
import PdfViewer from 'modules/theses/pdf/PdfViewer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'

export async function getStaticPaths() {
  const data = await fetchNewestThesesJson(process.env.API_URL)

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
  const classes = useStyle()
  const router = useRouter()
  const [session, loading] = useSession()
  const [checkEmail, setCheckEmail] = useState(false)

  const gridItemProperty = {
    property: {
      item: true,
      xs: 3,
    },

    value: {
      item: true,
      xs: 9,
    },
  }

  useEffect(() => {
    // debug
    // session && !loading && details
    //   ? console.log('-- check email --', { session, loading, details })
    //   : console.log('session is undefined or loading or details is not ready')

    // production
    session && !loading && details
      ? setCheckEmail(session.user.id === details.user.id)
      : setCheckEmail(false)
  }, [session, loading, details])

  // cho trang fetch du lieu -> hien thi component loading
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Chi tiết luận văn - Theses Share</title>
        </Head>

        <Loading />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>
          {details.name} - {details.user.full_name}
        </title>
      </Head>

      <h1>Chi tiết luận văn</h1>

      <Container maxWidth="md" className={classes.container}>
        <Grid container>
          {/* name */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Tên:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.name}
          </Grid>

          {/* faculty */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Khoa:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.faculty.name_vi}
          </Grid>

          {/* year */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Năm xuất bản:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.published_year}
          </Grid>

          {/* tags */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Tags:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.tags.map(item => item.name_vi).join(', ')}
          </Grid>

          {/* type */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Loại:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.type}
          </Grid>

          {/* authors */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Tác giả:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.authors}
          </Grid>

          {/* teachers */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            GVHD:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.teachers}
          </Grid>

          {/* format */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Định dạng:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.format}
          </Grid>

          {/* language */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Ngôn ngữ:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.language}
          </Grid>

          {/* views */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Lượt xem:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.views}
          </Grid>

          {/* user publish */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Người đăng
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.user.full_name}
          </Grid>
        </Grid>
      </Container>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        {checkEmail && (
          <Button variant="contained" color="primary">
            Chỉnh sửa
          </Button>
        )}
      </Box>

      <PdfViewer file={details.link_storage} isList={false} />
    </>
  )
}

const useStyle = makeStyles(theme => ({
  gridItem: {
    padding: '1rem',
    borderBottom: '1px solid #ddd',
  },
}))
