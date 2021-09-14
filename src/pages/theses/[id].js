import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ThesisDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>{id} Chi tiết luận văn</title>
      </Head>

      <h1>Chi tiết luận văn</h1>
      <h3>ID: {id}</h3>
    </>
  )
}
