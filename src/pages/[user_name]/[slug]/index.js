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
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Loading from "common/components/loading/Loading";
import {
  deleteThesis,
  fetchThesisBySlug,
  patchThesisViews,
} from "modules/theses/fetch-theses";
import PdfViewer from "modules/theses/pdf/PdfViewer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/client";
import Link from "next/link";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { snackbarCaseMessages } from "common/utils/constants";
import {
  addBookmark,
  deleteBookmark,
  getBookmarkByUsernameAndThesisId,
} from "modules/bookmarks/fetch-bookmarks";
import AlertSnackbarCustom from "common/components/AlertSnackbarCustom";

// export async function getStaticPaths() {
//   const data = await fetchNewestTheses(process.env.NEXT_PUBLIC_API_URL)

//   const paths = data.map(item => {
//     return {
//       params: {
//         user_name: item.user.user_name,
//         slug: item.slug,
//       },
//     }
//   })

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

export async function getServerSideProps({ params }) {
  const details = await fetchThesisBySlug(
    process.env.NEXT_PUBLIC_API_URL,
    params.slug
  );

  if (!details)
    return {
      notFound: true,
    };
  // check if thesis belong to [email]
  else if (params.user_name !== details.user.user_name)
    return {
      notFound: true,
    };

  return {
    props: {
      details,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
  };
}

export default function ThesisDetail({ details, apiUrl }) {
  const classes = useStyle();
  const router = useRouter();
  const [session, loading] = useSession();
  const [checkEmail, setCheckEmail] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    action: "",
    severity: "",
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const gridItemProperty = {
    property: {
      item: true,
      xs: 3,
    },

    value: {
      item: true,
      xs: 9,
    },
  };

  useEffect(() => {
    async function getData() {
      if (session) {
        const status = await getBookmarkByUsernameAndThesisId(
          apiUrl,
          session.user.user_name,
          details.id
        );

        setBookmark(status);
      }

      // wait for session and details to load
      session && !loading && details
        ? setCheckEmail(session.user.id === details.user.id)
        : setCheckEmail(false);
    }
    getData();
  }, [session, loading, details]);

  useEffect(() => {
    async function updateViews() {
      await patchThesisViews(apiUrl, details.id);
    }
    updateViews();
  }, []);

  // --- snackbar & dialog ---
  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false);

    snackbarProps.action === "delete thesis" &&
      snackbarProps.severity === "success" &&
      router.push(`/${session.user.user_name}`);
  }

  // --- Edit Delete Bookmark ---

  function handleEdit() {
    router.push(`/${details.user.user_name}/${details.slug}/edit`);
  }

  async function handleDelete() {
    handleCloseDialog();

    const status = await deleteThesis(apiUrl, session.user.id, details.id);
    status
      ? setSnackbarProps(snackbarCaseMessages.deleteThesisSuccess)
      : setSnackbarProps(snackbarCaseMessages.deleteThesisError);
    setOpenSnackbar(true);
  }

  async function handleBookmark() {
    if (!session) {
      signIn();
    } else {
      if (bookmark) {
        const result = await deleteBookmark(
          apiUrl,
          session.user.user_name,
          details.id
        );

        result
          ? setSnackbarProps(snackbarCaseMessages.deleteBookmarkSuccess)
          : setSnackbarProps(snackbarCaseMessages.deleteBookmarkError);
      } else {
        const result = await addBookmark(
          apiUrl,
          session.user.user_name,
          details.id
        );

        result
          ? setSnackbarProps(snackbarCaseMessages.addBookmarkSuccess)
          : setSnackbarProps(snackbarCaseMessages.addBookmarkError);
      }

      setOpenSnackbar(true);
      setBookmark(!bookmark);
    }
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
    );
  }

  return (
    <>
      <Head>
        <title>
          {details.name} - {details.user.user_name}
        </title>
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Box display="flex" alignItems="center">
          <h1>{details.name}</h1>

          <div>
            <IconButton
              className={classes.bookmarkBtn}
              onClick={handleBookmark}
            >
              {session &&
                (bookmark ? (
                  <Bookmark fontSize="large" />
                ) : (
                  <BookmarkBorder fontSize="large" />
                ))}
            </IconButton>
          </div>
        </Box>

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
            {details.tags
              .filter((item) => item.name_vn !== "rỗng")
              .map((item) => item.name_vn)
              .join(", ")}
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
            <Link href={`/${details.user.user_name}`}>
              <a className={classes.link}>{details.user.user_name}</a>
            </Link>
          </Grid>

          {/* views */}
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Tổng quan
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.abstract}
          </Grid>
        </Grid>

        {
          // edit & delete button
          checkEmail && (
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              height={35}
              my={3}
            >
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
            hoàn tác
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

      <AlertSnackbarCustom
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarProps.severity}
        message={snackbarProps.message}
      />
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(2),
    borderBottom: "1px solid #ddd",
    fontSize: theme.typography.body1.fontSize,
  },

  delBtn: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(2),

    "&:hover": {
      background: "#fff0f0",
    },
  },

  bookmarkBtn: {
    color: theme.palette.warning.light,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),

    "&:hover": {
      background: "rgba(255, 152, 0, 0.1)",
    },
  },

  link: {
    textDecoration: "underline",
  },
}));
