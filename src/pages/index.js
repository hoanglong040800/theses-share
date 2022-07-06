import { Box, makeStyles } from "@material-ui/core";
import { colDef } from "common/utils/constants";
import { fetchNewestTheses } from "modules/theses/fetch-theses";
import ThesesTable from "modules/theses/table/ThesesTable";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export async function getServerSideProps() {
  const numOfTheses = 10;
  const newestTheses = await fetchNewestTheses(process.env.API_URL);

  if (!newestTheses) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      newestTheses,
    },
  };
}

export default function Home({ newestTheses }) {
  const mui = useStyles();
  const idArr = newestTheses.map((thesis) => thesis.id);
  const maxId = Math.max(...idArr);

  useEffect(() => {
    JSON.stringify(localStorage.setItem("max_id", maxId));
  }, [maxId]);
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <h1>Các luận văn mới được đăng tải</h1>

      <Box my={6}>
        <Box mt={3}>
          <ThesesTable columns={colDef} rows={newestTheses} />
        </Box>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  link: {
    display: "inline",

    "&:hover": {
      textDecoration: "underline",
    },
  },
});
