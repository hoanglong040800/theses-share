import { AppBar, Box, Container, makeStyles, Toolbar } from '@material-ui/core'
import NavSearchBar from 'modules/search/NavSearchBar'
import Link from 'next/link'
import NavLink from './NavLink'

export default function Navbar() {
  const classes = useStyles()

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Container maxWidth="xl">
          <Box className={classes.toolbar}>
            {/* left side */}
            <Box display="flex">
              <Box className={classes.mobile} mr={2}>
                <h3>Icon Menu</h3>
              </Box>

              <Link href="/">
                <a>
                  <h3>Logo</h3>
                </a>
              </Link>

              <Box className={classes.desktop} mx={3} alignItems="center">
                <NavLink />
              </Box>
            </Box>

            {/* right side */}
            <Box display="flex" alignItems="center" flex={1}>
              <NavSearchBar />

              <h3>Profile</h3>
            </Box>
            {/* right side */}
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
