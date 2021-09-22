import { useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'common/themes/theme'
import 'common/styles/global.css'
import DefaultLayout from 'common/layouts/DefaultLayout'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Theses Share - Nơi chia sẻ khóa luận</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

        <ThemeProvider theme={theme}>
          <DefaultLayout>
            <CssBaseline />

            <Component {...pageProps} />
          </DefaultLayout>
        </ThemeProvider>
    </>
  )
}
