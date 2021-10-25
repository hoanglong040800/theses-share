import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function SearchPage() {
  const router = useRouter()

  useEffect(() => {}, [])

  return (
    <>
      <Head>
        <title>Kết quả tìm kiếm</title>
      </Head>

      <h1>
        Kết quả tìm kiếm cho: <span></span>
      </h1>

      <pre>{JSON.stringify(router, null, 2)}</pre>
    </>
  )
}
