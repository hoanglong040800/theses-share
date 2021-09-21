import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ThesisDetail() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <h1>Chi tiết luận văn</h1>
      <h3>Slug: {slug}</h3>
    </>
  )
}
