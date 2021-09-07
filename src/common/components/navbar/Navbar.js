import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { ClassSharp, Menu } from '@material-ui/icons'

export default function Navbar() {
  const classes = useStyles()

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Container maxWidth='xl'>

          <Box className={classes.toolbar}>
            <Box display="flex">
              <Box className={classes.mobile} mr={2}>
                <h3>Icon Menu</h3>
              </Box>

              <h3>Logo</h3>

              <Box className={classes.desktop} ml={2}>
                <h3>Link</h3>
              </Box>
            </Box>

            <Box display="flex">
              <h3>Search</h3>

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
