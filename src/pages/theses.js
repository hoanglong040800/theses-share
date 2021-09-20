import { colDef } from 'common/utils/constants'
import { objToQueryString } from 'common/utils/util'
import { fetchThesesWithQuery } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
  return {
    props: {
      apiUrl: process.env.API_URL,
    },
  }
}

export default function Theses({ apiUrl }) {
  const router = useRouter()
  // query from url
  const { faculty, tags, published_year } = router.query

  // state
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRows() {
      setLoading(true)
      const data = await fetchThesesWithQuery(
        apiUrl,
        objToQueryString(router.query)
      )

      setLoading(false)
      setRows(data)
    }

    fetchRows()
  })

  return (
    <>
      <Head>
        <title>Luận văn</title>
      </Head>

      <h1>Trang lọc luận văn</h1>

      <div>
        {faculty && <h3>Khoa: {faculty}</h3>}
        {tags && <h3>Tags: {tags}</h3>}
        {published_year && <h3>Năm: {published_year}</h3>}
      </div>

      <ThesesTable
        columns={colDef}
        rows={rows}
        pageSize={5}
        hideFooter={false}
        loading={loading}
      />
    </>
  )
}
