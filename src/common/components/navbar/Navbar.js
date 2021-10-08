import Image from 'next/image'
import {
  AppBar,
  Box,
  Button,
  Container,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import NavSearchBar from 'modules/search/NavSearchBar'
import Link from 'next/link'
import NavLink from './NavLink'
import NavProfile from './NavProfile'
import { signIn, useSession } from 'next-auth/client'

export default function Navbar() {
  const classes = useStyles()
  const [session, loading] = useSession()

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

              {session ? (
                <NavProfile />
              ) : (
                <Button variant="contained" color="primary" onClick={signIn}>
                  Sign In
                </Button>
              )}
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
