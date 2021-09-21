import { Grid, makeStyles, Paper, Tab, Tabs } from '@material-ui/core'
import { settingsPages } from 'common/utils/constants'
import { useRouter } from 'next/router'

export default function SettingsTabs({ children, value }) {
  const router = useRouter()
  const mui = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3} className={mui.sidebar}>
        <Paper variant="outlined" className={mui.paper}>
          <Tabs orientation="vertical" value={value} variant="fullWidth">
            {
              //
              settingsPages.map(item => (
                <Tab
                  key={item.label}
                  label={item.label}
                  value={item.pathname}
                  onClick={() => router.push(item.pathname)}
                  className={mui.tab}
                />
              ))
            }
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
      width: '3px !important',
      backgroundColor: [theme.palette.primary.light],
    },
  },

  sidebar: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '200px',
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
