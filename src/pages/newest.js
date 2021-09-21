import Head from "next/head";
import { Box } from "@material-ui/core";
import { colDef } from "common/utils/constants";
import ThesesTable from "modules/theses/table/ThesesTable";
import { fetchNewestTheses } from "modules/theses/fetch-theses";

export async function getStaticProps() {
  const newestTheses = await fetchNewestTheses(process.env.API_URL);

  // chay ham fetch trong file fetch-theses.js

  return {
    props: {
      newestTheses,
    },
  };
}

export default function NewestTheses({ newestTheses }) {
  return (
    <>
      <Head>
        <title>Luận văn mới nhất</title>
      </Head>

      <h1>Luận văn mới nhất</h1>

      <Box mt={3}>
        <ThesesTable columns={colDef} rows={newestTheses} />
      </Box>
    </>
  );
}
