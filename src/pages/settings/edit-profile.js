import { Divider } from '@material-ui/core'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  return { props: { session } }
}

export default function EditProfile({ session }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Chỉnh sửa hồ sơ</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Chỉnh sửa hồ sơ</h1>

        <Divider />

        <h3>Signed in as {session.user.full_name} </h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </SettingsTabs>
    </>
  )
}

EditProfile.auth = true
