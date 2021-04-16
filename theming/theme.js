import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1060,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#8B82D1",
      light: "#F9FAFB",
      contrastText: "#fff",
      dark: "#464646",
    },
    secondary: {
      main: "#ccc4df",
      light: "#D1D5DB",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#707070",
    },
    background: {
      default: "#F0F2F5",
      paper: "#fff",
    },
    divider: "#F0F2F5",
  },
  props: {
    MuiButton: {
      size: "large",
    },
  },
});
