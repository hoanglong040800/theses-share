import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SearchPage() {
  const router = useRouter()
  const { q } = router.query

  return (
    <>
      <Head>
        <title>Kết quả tìm kiếm</title>
      </Head>

      <h1>
        Kết quả tìm kiếm cho: <span>{q}</span>
      </h1>
    </>
  )
}
