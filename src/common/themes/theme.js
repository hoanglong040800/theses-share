import { createTheme } from '@material-ui/core'
import { red, amber } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: {
      light: '#db447f',
      main: '#c23c70',
      dark: '#a63360',
    },
    secondary: {
      light: amber[100],
      main: amber[200],
      dark: amber[300],
    },
    error: {
      main: red[400],
    },

    background: {
      default: '#fff',
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

  typography: {
    button: {
      textTransform: 'inherit',
    },
  },
})

export default theme
