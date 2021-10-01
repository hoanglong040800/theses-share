import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  fetchNewestTheses,
  fetchThesisBySlug,
} from "modules/theses/fetch-theses";
import PdfViewer from "modules/theses/pdf/PdfViewer";
import Head from "next/head";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const data = await fetchNewestTheses(process.env.API_URL);

  const paths = data.map((item) => {
    return {
      params: {
        email: item.user.email,
        slug: item.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      details: await fetchThesisBySlug(process.env.API_URL, params.slug),
    },
  };
}

export default function ThesisDetail({ details }) {
  const classes = useStyle();
  const router = useRouter();

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
    );
  }

  return (
    <>
      <Head>
        <title>{details.name} | Theses Share</title>
      </Head>

      <h1>Chi tiết luận văn</h1>
      {/* <pre>{JSON.stringify(details, 0, 2)}</pre> */}
      <Container maxWidth="md" className={classes.container}>
        <Grid container className={classes.gridContainer}>
          <Grid item xl={2} xs={3} sm={3} md={2}>
            Loại tài liệu:
          </Grid>
          <Grid item xl={10} xs={9} sm={9} md={10}>
            {details.type}
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xl={2} xs={3} sm={3} md={2}>
            Tên:
          </Grid>
          <Grid item xl={10} xs={9} sm={9} md={10}>
            {details.name}
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xl={2} xs={3} sm={3} md={2}>
            Khoa:
          </Grid>
          <Grid item xl={10} xs={9} sm={9} md={10}>
            {details.faculty}
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xl={2} xs={3} sm={3} md={2}>
            Năm xuất bản:
          </Grid>
          <Grid item xl={10} xs={9} sm={9} md={10}>
            {details.published_year}
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xl={2} xs={3} sm={3} md={2}>
            Ngôn ngữ:
          </Grid>
          <Grid item xl={10} xs={9} sm={9} md={10}>
            {details.language}
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xl={2} xs={3} sm={3} md={2}>
            Lượt xem:
          </Grid>
          <Grid item xl={10} xs={9} sm={9} md={10}>
            {details.views}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary">
            Chỉnh sửa
          </Button>
        </Box>
      </Container>
      <PdfViewer file={details.link_storage} isList={false} />
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  gridContainer: {
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
}));
