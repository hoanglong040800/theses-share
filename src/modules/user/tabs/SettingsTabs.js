import { Grid, makeStyles, Paper, Tab, Tabs } from '@material-ui/core'
import { useRouter } from 'next/router'

export default function SettingsTabs({ children, value }) {
  const router = useRouter()
  const mui = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" className={mui.paper}>
          <Tabs orientation="vertical" value={value} variant="fullWidth">
            <Tab
              label="Hồ sơ của tôi"
              value="profile"
              onClick={() => router.push('/settings/profile')}
              className={mui.tab}
            />

            <Tab
              label="Tài khoản"
              value="account"
              onClick={() => router.push('/settings/account')}
              className={mui.tab}
            />

            <Tab
              label="Đổi mật khẩu"
              value="change-password"
              onClick={() => router.push('/settings/change-password')}
              className={mui.tab}
            />
          </Tabs>
        </Paper>
      </Grid>

      <Grid item xs={12} md={9}>
        {children}
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    '& .MuiTabs-indicator': {
      width: '5px !important',
      backgroundColor: [theme.palette.primary.light],
    },
  },

  tab: {
    padding: '10px 20px',
    fontSize: '0.9rem',
    fontWeight: 700,
    borderBottom: '1px solid lightgray',
    color: [theme.palette.primary.dark],
  },
}))
