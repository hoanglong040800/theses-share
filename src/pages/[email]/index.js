import { Box, Tab, Tabs } from '@material-ui/core'
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

      <h1>Trang profile và theses</h1>
      <h3>Email: {email}</h3>
      <h3>Tab: {tab}</h3>

      <Box display="flex" justifyContent="center">
        <Tabs value={tab || 'theses'}>
          <Tab
            label="Luan van"
            value="theses"
            onClick={() => router.push('/hoanglong040800')}
          />

          <Tab
            label="Yeu thich"
            value="bookmark"
            onClick={() => router.push('/hoanglong040800?tab=bookmark')}
          />
        </Tabs>
      </Box>
      {tab == undefined && <h1>Luan van</h1>}
      {tab == 'bookmark' && <h1>Yeu thich</h1>}
    </>
  )
}
