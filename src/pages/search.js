import { Box } from "@material-ui/core";
import { getThesesBySearch } from "modules/theses/fetch-theses";
import ThesesTable from "modules/theses/table/ThesesTable";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getTheses() {
      const data = await getThesesBySearch(
        process.env.NEXT_PUBLIC_API_URL,
        router.query.q
      );
      setRows(data);
    }
    getTheses();
  }, [router.query.q]);

  return (
    <>
      <Head>
        <title>Kết quả tìm kiếm</title>
      </Head>

      <h1>
        Kết quả tìm kiếm cho: <span>{router.query.q}</span>
      </h1>

      <Box mt={5}>
        <ThesesTable rows={rows} />
      </Box>
    </>
  );
}
