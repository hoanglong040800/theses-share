import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'

export default function ChangePassword() {
  return (
    <>
      <Head>
        <title>Đổi mật khẩu</title>
      </Head>

      <SettingsTabs value="change-password">
        <h1>Đổi mật khẩu</h1>
      </SettingsTabs>
    </>
  )
}
