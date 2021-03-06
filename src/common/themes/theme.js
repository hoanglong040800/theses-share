import { createTheme } from "@material-ui/core";
import { red, blueGrey, lightGreen, grey } from "@material-ui/core/colors";

const theme = createTheme({
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },

  overrides: {
    MuiButton: {
      root: {
        borderRadius: "3rem",
        fontSize: "1rem",
      },
    },
  },

  palette: {
    primary: {
      light: blueGrey[600],
      main: blueGrey[700],
      dark: blueGrey[800],
    },
    secondary: {
      light: grey[200],
      main: grey[300],
      dark: grey[400],
    },
    error: {
      main: red[400],
    },

    background: {
      default: "#fff",
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
    fontFamily: [
      "Quicksand",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "sans-serif",
      "serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(", "),
  },
});

export default theme;
