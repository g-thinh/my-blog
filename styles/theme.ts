import { Theme } from "theme-ui";
import colors from "./colors";
import shadows from "./shadows";
import typography from "./typography";

export const theme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors,
  shadows,
  text: {
    block: {
      fontFamily: "inherit",
      lineHeight: "body",
    },
  },
  styles: {
    typography,
  },
  radii: {
    card: "1rem",
  },
  breakpoints: ["48em", "64em"],
  buttons: {
    back: {
      backgroundColor: "transparent",
      padding: 0,
      color: "grey",
      width: "fit-content",
      cursor: "pointer",
      "&:hover": {
        color: "primary",
      },

      "&:focus": {
        color: "primary",
      },
    },
    scrollToTop: {
      backgroundColor: "transparent",
      padding: 0,
      color: "grey",
      width: "fit-content",
      cursor: "pointer",
      "&:hover": {
        color: "primary",
      },
      "&:focus": {
        color: "primary",
      },
    },
    link: {
      color: "text",
      width: "fit-content",
      boxShadow: "card",
      marginTop: "auto",
      cursor: "pointer",
      textDecoration: "none",
      backgroundColor: "highlight",
      "&:hover": {
        backgroundColor: "primary",
        color: "black",
      },
    },
    secondary: {
      boxShadow: "card",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "black",
      },
    },
  },
};
