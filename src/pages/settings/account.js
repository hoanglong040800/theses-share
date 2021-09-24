import { Divider } from '@material-ui/core'
import PdfViewer from 'modules/theses/pdf/PdfViewer'
import SettingsTabs from 'modules/user/tabs/SettingsTabs'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ChangePassword() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Cài đặt tài khoản</title>
      </Head>

      <SettingsTabs value={router.pathname}>
        <h1>Cài đặt tài khoản</h1>
        <Divider />

        <PdfViewer isList={true} />
      </SettingsTabs>
    </>
  )
}
