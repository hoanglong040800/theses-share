import Image from 'next/image'
import { AppBar, Box, Container, makeStyles, Toolbar } from '@material-ui/core'
import NavSearchBar from 'modules/search/NavSearchBar'
import Link from 'next/link'
import NavLink from './NavLink'
import NavProfile from './NavProfile'

export default function Navbar() {
  const classes = useStyles()

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Container maxWidth="xl">
          <Box className={classes.toolbar}>
            {/* left side */}
            <Box display="flex">
              <Box className={classes.mobile} mr={2}>
                <h3>Icon Menu</h3>
              </Box>

              <Box display="flex" alignItems="center">
                <Link href="/">
                  <a>
                    <Image
                      src="/logo.png"
                      alt="logo-theses-share"
                      width={35}
                      height={30}
                    />
                  </a>
                </Link>
              </Box>

              <Box className={classes.desktop} mx={2} alignItems="center">
                <NavLink />
              </Box>
            </Box>
            {/* left side */}

            {/* right side */}
            <Box display="flex" alignItems="center" flex={1}>
              <NavSearchBar />

              <NavProfile />
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
