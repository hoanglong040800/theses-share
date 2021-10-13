import { colDef } from 'common/utils/constants'
import { fetchThesesWithQuery } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export async function getServerSideProps() {
  return {
    props: {
      apiUrl: process.env.API_URL,
    },
  }
}

export default function Theses({ apiUrl }) {
  const router = useRouter()
  const { faculty, tags, published_year } = router.query

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRows() {
      setLoading(true)

      const data = await fetchThesesWithQuery(
        apiUrl,
        new URLSearchParams(router.query).toString() // encode obj to URI query string
      )

      setLoading(false)
      setRows(data)
    }

    fetchRows()
  }, [router.query, apiUrl])

  // handle error
  if (rows === false) {
    return <Error statusCode={404} />
  }

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

      <button
        onClick={() =>
          router.push(
            {
              pathname: '/explore',
              query: {
                faculty: 'CNPM',
                published_year: 2019,
              },
            },
            undefined,
            { shallow: true }
          )
        }
      >
        Change to CNPM 2019
      </button>

      <button
        onClick={() =>
          router.push(
            {
              pathname: '/explore',
              query: {
                faculty: 'MMT&TT',
                published_year: 2018,
              },
            },
            undefined,
            { shallow: true }
          )
        }
      >
        Change to MMTT 2018
      </button>

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
