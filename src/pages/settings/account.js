import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'

export default function ChangePassword() {
  return (
    <>
      <Head>
        <title>Cài đặt tài khoản</title>
      </Head>

      <SettingsTabs value='account'>
      <h1>Cài đặt tài khoản</h1>
      </SettingsTabs>
    </>
  )
}
