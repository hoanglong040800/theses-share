import { AppBar, Box, Container, makeStyles, Toolbar } from '@material-ui/core'
import Link from 'next/link'
import NavLink from './NavLink'

export default function Navbar() {
  const classes = useStyles()

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Container maxWidth="xl">
          <Box className={classes.toolbar}>
            <Box className={classes.box}>
              <Box className={classes.mobile} mr={2}>
                <h3>Icon Menu</h3>
              </Box>

              <Link href="/">
                <a>
                  <h3>Logo</h3>
                </a>
              </Link>

              <Box className={classes.desktop} ml={2} alignItems='center'>
                <NavLink />
              </Box>
            </Box>

            <Box className={classes.box}>
              <Box mr={2}>
                <h3>Search</h3>
              </Box>

              <h3>Profile</h3>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  box: {
    display: 'flex',
  },

  desktop: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  mobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
}))
