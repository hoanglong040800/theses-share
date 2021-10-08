import { Divider } from '@material-ui/core'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  return { props: { session } }
}

export default function AccountSettings() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Cài đặt tài khoản</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Cài đặt tài khoản</h1>
        <Divider />
      </SettingsTabs>
    </>
  )
}

AccountSettings.auth = true
