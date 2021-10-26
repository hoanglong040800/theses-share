import { Box, Button, makeStyles, Tab, Tabs } from '@material-ui/core'
import { userPages } from 'common/utils/constants'
import { getUserByUsername } from 'modules/user/fetch-users'
import { getThesesByUsername } from 'modules/theses/fetch-theses'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ThesesTable from 'modules/theses/table/ThesesTable'

export async function getServerSideProps({ params: { user_name } }) {
  const apiUrl = process.env.API_URL
  const userDetails = await getUserByUsername(apiUrl, user_name)
  const userTheses = await getThesesByUsername(apiUrl, user_name)
  const userBookmarks = 1

  if (userDetails)
    return {
      props: {
        userDetails,
        userTheses,
        userBookmarks,
      },
    }
  else
    return {
      notFound: true,
    }
}

export default function UserProfile({ userDetails, userTheses }) {
  const router = useRouter()
  const mui = useStyles()
  const [session, loading] = useSession()

  var { tab } = router.query
  tab = tab || 'theses'

  return (
    <>
      <Head>
        <title>Hồ sơ</title>
      </Head>

      <Box display="flex" alignItems="center">
        <h1>Hồ sơ của {userDetails.user_name}</h1>

        {session ? (
          session.user.user_name === router.query.user_name ? (
            <Box ml={3}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => router.push('/new')}
              >
                Thêm luận văn +
              </Button>
            </Box>
          ) : null
        ) : null}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        maxWidth="400px"
        mx="auto"
        mb={3}
      >
        <div className={mui.gridContainer}>
          <p>Họ và tên</p>
          <p>{userDetails.full_name}</p>
        </div>

        <div className={mui.gridContainer}>
          <p>Tuổi</p>
          <p>{userDetails.age}</p>
        </div>

        <div className={mui.gridContainer}>
          <p>Giới tính</p>
          <p>{userDetails.gender}</p>
        </div>

        <div className={mui.gridContainer}>
          <p>Trường</p>
          <p>{userDetails.university}</p>
        </div>

        <div className={mui.gridContainer}>
          <p>Ngành</p>
          <p>{userDetails.major.name_vn}</p>
        </div>

        <div className={mui.gridContainer}>
          <p>Năm học</p>
          <p>{userDetails.academic_year}</p>
        </div>
      </Box>

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
                  onClick={() =>
                    router.push(`/${router.query.user_name}?tab=${item.value}`)
                  }
                />
              ))
            }
          </Tabs>
        </Box>

        <Box mt={5}>
          {tab == 'theses' && (
            <>
              <ThesesTable rows={userTheses} />
            </>
          )}

          {tab == 'bookmark' && <h3>Những luận văn đánh dấu yêu thích</h3>}
        </Box>
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

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '100px auto',
    gridGap: '1rem 0',
    borderBottom: '1px solid #ddd',
  },
}))
