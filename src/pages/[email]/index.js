import Head from 'next/head'
import { useRouter } from 'next/router'

export default function OverviewUser() {
  const router = useRouter()
  const { email } = router.query
  const { tab } = router.query

  return (
    <>
      <Head>
        <title>{email}</title>
      </Head>

      <h1>Trang profile và theses của {email}</h1>
      <h3>Email: {email}</h3>
      <h3>Tab: {tab}</h3>
    </>
  )
}
