import { Divider } from '@material-ui/core'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ChangePassword() {
  const router=useRouter()

  return (
    <>
      <Head>
        <title>Đổi mật khẩu</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Đổi mật khẩu</h1>
        <Divider />
      </SettingsTabs>
    </>
  )
}
