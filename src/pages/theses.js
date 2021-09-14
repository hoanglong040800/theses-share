import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Filter() {
  const router = useRouter()
  const { faculty, tag, published_year } = router.query

  return (
    <>
      <Head>
        <title>Luận văn</title>
      </Head>

      <h1>Trang lọc luận văn</h1>
      <h3>Khoa: {faculty}</h3>
      <h3>Tag: {tag}</h3>
      <h3>Năm: {published_year}</h3>
    </>
  )
}
