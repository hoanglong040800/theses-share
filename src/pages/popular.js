import Head from "next/head";
import { Box } from "@material-ui/core";
import { colDef } from "common/utils/constants";
import ThesesTable from "modules/theses/table/ThesesTable";
import { fetchMostViewsTheses } from "modules/theses/fetch-theses";

export async function getStaticProps() {
  const mostViewedTheses = await fetchMostViewsTheses(process.env.API_URL);

  // chay ham fetch trong file fetch-theses.js

  return {
    props: {
      mostViewedTheses,
    },
  };
}

export default function Popular({ mostViewedTheses }) {
  return (
    <>
      <Head>
        <title>Luận văn xem nhiều</title>
      </Head>

      <h1>Luận văn xem nhiều</h1>
      <Box mt={3}>
        <ThesesTable columns={colDef} rows={mostViewedTheses} />
      </Box>
    </>
  );
}
