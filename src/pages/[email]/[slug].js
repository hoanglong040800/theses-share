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

  const gridItemProperty = {
    property: {
      item: true,
      xl: 3,
      xs: 3,
      sm: 3,
      md: 3,
    },

    value: {
      item: true,
      xl: 9,
      xs: 9,
      sm: 9,
      md: 9,
    },
  };

  const email = "18520093@gm.uit.edu.vn";
  const checkEmail = details.user.email === email;

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
      <Container maxWidth="md" className={classes.container}>
        <Grid container>
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Tên:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.name}
          </Grid>
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Loại:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.type}
          </Grid>
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Tác giả:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.author.map((name) => (
              <div>{name}</div>
            ))}
          </Grid>
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            GVHD:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.teachers.map((teacher) => (
              <div>{teacher}</div>
            ))}
          </Grid>
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Năm xuất bản:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.published_year}
          </Grid>
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Định dạng:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.format.map((f) => (
              <div>{f}</div>
            ))}
          </Grid>

          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Ngôn ngữ:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.language}
          </Grid>

          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Lượt xem:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.views}
          </Grid>
          <Grid {...gridItemProperty.property} className={classes.gridItem}>
            Thẻ:
          </Grid>
          <Grid {...gridItemProperty.value} className={classes.gridItem}>
            {details.tags.map((item) => (
              <div>{item}</div>
            ))}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <div>
            {checkEmail && (
              <Button
                disabled={details.user.email !== email}
                variant="contained"
                color="primary"
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
        </Box>
      </Container>
      <PdfViewer file={details.link_storage} isList={false} />
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  gridItem: {
    padding: "1rem",
    borderBottom: "1px solid #ddd",
  },
}));
