import { Box, Button, makeStyles, Tab, Tabs } from '@material-ui/core'
import { userPages } from 'common/utils/constants'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function OverviewUser() {
  const router = useRouter()
  const mui = useStyles()
  const { email } = router.query
  var { tab } = router.query
  tab = tab || 'theses'

  const gridItemProperty = {
    property: {
      item: true,
      xs: 2,
    },

    value: {
      item: true,
      xs: 10,
    },
  }

  // const genderVie = session.user.gender === "male" ? "Nam" : "Nữ";

  return (
    <>
      <Head>
        <title>Hồ sơ</title>
      </Head>

      <h1>Trang profile và theses</h1>

      <>
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

        {tab == 'theses' && (
          <Box mt={5}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/new')}
              >
                Thêm luận văn
              </Button>
            </Box>

            <h3>Tất cả luận văn đã đăng</h3>
          </Box>
        )}

        {tab == 'bookmark' && (
          <Box mt={5}>
            <h3>Những luận văn đánh dấu yêu thích</h3>
          </Box>
        )}
      </>
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
