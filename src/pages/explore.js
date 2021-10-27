import { colDef } from 'common/utils/constants'
import { fetchThesesWithQuery } from 'modules/theses/fetch-theses'
import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchAllFaculties, fetchAllTags } from 'modules/fetch-common'
import { getIdByValueInArrObj } from 'common/utils/util'

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL
  const allFaculties = await fetchAllFaculties(apiUrl)
  const allTags = await fetchAllTags(apiUrl)

  return {
    props: {
      apiUrl,
      allFaculties,
      allTags,
    },
  }
}

export default function Theses({ apiUrl, allFaculties, allTags }) {
  const router = useRouter()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRows() {
      setLoading(true)

      const filterQuery = {
        faculty: getIdByValueInArrObj(
          allFaculties,
          'name_short_vn',
          router.query.faculty
        ),

        published_year: router.query.published_year || '',

        tag: getIdByValueInArrObj(allTags, 'name_short_en', router.query.tag),

        sort: 'upload_date',

        order: 'desc',
      }

      const data = await fetchThesesWithQuery(
        apiUrl,
        new URLSearchParams(filterQuery).toString()
      )

      setRows(data)
      setLoading(false)
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
        <pre>{JSON.stringify(router.query, null, 2)}</pre>
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
                faculty: 'MMTT&DL',
                published_year: 2019,
              },
            },
            undefined,
            { shallow: true }
          )
        }
      >
        Change to MMTT&DL 2019
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
