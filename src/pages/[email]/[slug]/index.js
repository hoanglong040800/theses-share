import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import Loading from 'common/components/loading/Loading'
import {
  deleteThesis,
  fetchNewestTheses,
  fetchThesisBySlug,
} from 'modules/theses/fetch-theses'
import PdfViewer from 'modules/theses/pdf/PdfViewer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { getNameFromEmail } from 'common/utils/util'

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
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const details = await fetchThesisBySlug(process.env.API_URL, params.slug)

  if (!details)
    return {
      notFound: true,
    }
  // check if thesis belong to [email]
  else if (params.email !== getNameFromEmail(details.user.email))
    return {
      notFound: true,
    }

  return {
    props: {
      details: await fetchThesisBySlug(process.env.API_URL, params.slug),
      apiUrl: process.env.API_URL,
    },
  }
}

export default function ThesisDetail({ details, apiUrl }) {
  const classes = useStyle()
  const router = useRouter()
  const [session, loading] = useSession()
  const [checkEmail, setCheckEmail] = useState(false)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [openDialog, setOpenDialog] = useState(false)

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

  // --- snackbar & dialog ---
  function handleOpenDialog() {
    setOpenDialog(true)
  }

  function handleCloseDialog() {
    setOpenDialog(false)
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false)

    severity === 'success'
      ? router.push(`/${getNameFromEmail(session.user.email)}`)
      : null
  }

  // --- Edit & Delete ---

  function handleEdit() {
    router.push(`/${getNameFromEmail(details.user.email)}/${details.slug}/edit`)
  }

  async function handleDelete() {
    handleCloseDialog()

    // const status = true
    const status = await deleteThesis(apiUrl, session.user.id, details.id)
    
    status ? setSeverity('success') : setSeverity('error')
    setOpenSnackbar(true)
  }

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
            {details.faculty.name_vn}
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
            {details.tags.map(item => item.name_vn).join(', ')}
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

        {
          // edit & delete button
          checkEmail && (
            <Box display="flex" justifyContent="flex-end" my={5}>
              <Button className={classes.delBtn} onClick={handleOpenDialog}>
                Xoá
              </Button>

              <Button variant="contained" color="primary" onClick={handleEdit}>
                Chỉnh sửa
              </Button>
            </Box>
          )
        }
      </Container>

      <PdfViewer file={details.link_storage} isList={false} />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Xác nhận xóa luận văn <b>{details.name}</b>? Hành động này không thể
            quay lại
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="default" onClick={handleCloseDialog} autoFocus>
            Hủy
          </Button>

          <Button className={classes.delBtn} onClick={handleDelete}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={2500}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {severity === 'success'
            ? 'Xóa luận văn thành công. Đang điều hướng đến trang hồ sơ của bạn'
            : 'Có lỗi xảy ra khi xóa. Thử lại lần sau.'}
        </Alert>
      </Snackbar>
    </>
  )
}

const useStyle = makeStyles(theme => ({
  gridItem: {
    padding: '1rem',
    borderBottom: '1px solid #ddd',
  },

  delBtn: {
    color: theme.palette.error.main,
    marginRight: 20,

    '&:hover': {
      background: '#fff0f0',
    },
  },
}))
