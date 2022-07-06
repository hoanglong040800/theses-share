import { Box, Button, makeStyles, Tab, Tabs } from "@material-ui/core";
import { userPages } from "common/utils/constants";
import { getUserByUsername } from "modules/user/fetch-users";
import { getThesesByUsername } from "modules/theses/fetch-theses";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import ThesesTable from "modules/theses/table/ThesesTable";
import { getBookmarksByUsername } from "modules/bookmarks/fetch-bookmarks";

export async function getServerSideProps({ params: { user_name } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const userDetails = await getUserByUsername(apiUrl, user_name);
  const userTheses = await getThesesByUsername(apiUrl, user_name);
  let userBookmarks = await getBookmarksByUsername(apiUrl, user_name);

  if (userDetails && userTheses && userBookmarks) {
    userBookmarks = userBookmarks.filter((item) => item !== null);

    return {
      props: {
        userDetails,
        userTheses,
        userBookmarks,
      },
    };
  }

  return {
    notFound: true,
  };
}

export default function UserProfile({
  userDetails,
  userTheses,
  userBookmarks,
}) {
  const router = useRouter();
  const mui = useStyles();
  const [session] = useSession();

  const tab = router.query.tab || "theses";
  const isUser = session
    ? session.user.user_name === router.query.user_name
      ? true
      : false
    : false;

  return (
    <>
      <Head>
        <title>Hồ sơ</title>
      </Head>

      <Box
        display="flex"
        flexDirection="column"
        gridGap={"1rem"}
        maxWidth="500px"
        mx="auto"
        mb={4}
      >
        <h1>Hồ sơ của {userDetails.user_name}</h1>

        <div className={mui.gridContainer}>
          <p>Họ và tên</p>
          <p>{userDetails.full_name}</p>
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

        {
          //
          isUser && (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                color="default"
                variant="contained"
                size="small"
                onClick={() => router.push("/settings/edit-profile")}
              >
                Sửa hồ sơ
              </Button>
            </Box>
          )
        }
      </Box>

      <>
        <Box display="flex" justifyContent="center">
          <Tabs value={tab} className={mui.tabs}>
            {
              //
              userPages.map((item) => (
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
          {tab === "theses" && (
            <>
              <Box display="flex" justifyContent="center" mb={3}>
                {
                  //
                  isUser && (
                    <Box ml={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push("/new")}
                      >
                        Thêm luận văn +
                      </Button>
                    </Box>
                  )
                }
              </Box>

              <ThesesTable rows={userTheses} />
            </>
          )}

          {tab === "bookmark" && <ThesesTable rows={userBookmarks} />}
        </Box>
      </>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: [theme.palette.primary.light],
    },
  },

  tab: {
    fontSize: "0.9rem",
    fontWeight: 700,
    borderBottom: "1px solid lightgray",
    color: [theme.palette.primary.dark],
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "100px auto",
    gridGap: "1rem 0",
    paddingBottom: "1rem",
    borderBottom: "1px solid #ddd",
  },
}));
