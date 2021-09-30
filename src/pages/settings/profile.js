import { Divider } from '@material-ui/core'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ChangePassword() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Chỉnh sửa hồ sơ</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Chỉnh sửa hồ sơ</h1>
        <Divider />
      </SettingsTabs>
    </>
  )
}

