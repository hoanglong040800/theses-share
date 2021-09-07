import { createTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[400],
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 480, //default: 600
      md: 768, //default: 960
      lg: 1024, //default: 1280
      xl: 1280, //default: 1920
    },
  },
})

export default theme
