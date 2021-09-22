import { Box, makeStyles, Tab, Tabs } from '@material-ui/core'
import { userPages } from 'common/utils/constants'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function OverviewUser() {
  const router = useRouter()
  const mui = useStyles()
  const { email } = router.query
  var { tab } = router.query
  tab = tab || 'theses'

  return (
    <>
      <Head>
        <title>{email}</title>
      </Head>

      <h1>Trang profile và theses</h1>
      <h3>Email: {email}</h3>
      <h3>Tab: {tab}</h3>

      <Box display="flex" justifyContent="center">
        <Tabs value={tab} className={mui.tabs}>
          {
            //
            userPages.map(item => (
              <Tab
                key={item.value}
                label={item.label}
                value={item.value}
                className={mui.tab}
                onClick={() => router.push(`/${email}?tab=${item.value}`)}
              />
            ))
          }
        </Tabs>
      </Box>
      {tab == 'theses' && <h3>Tất cả luận văn đã đăng</h3>}

      {tab == 'bookmark' && <h3>Những luận văn đánh dấu yêu thích</h3>}
    </>
  )
}

const useStyles = makeStyles(theme => ({
  tabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: [theme.palette.primary.light],
    },
  },

  tab: {
    fontSize: '0.9rem',
    fontWeight: 700,
    borderBottom: '1px solid lightgray',
    color: [theme.palette.primary.dark],
  },
}))
