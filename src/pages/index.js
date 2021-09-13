import ThesesTable from 'modules/theses/table/ThesesTable'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <h1>Trang chủ</h1>
      <ThesesTable />
    </>
  )
}
