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
      xs: 3,
    },

    value: {
      item: true,
      xs: 9,
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
            {details.faculty}
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
            {details.tags.join(", ")}
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
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <div>
            {checkEmail && (
              <Button variant="contained" color="primary">
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
