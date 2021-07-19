import { Theme } from "theme-ui";
import colors from "./colors";
import shadows from "./shadows";

export const theme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64, 96],
  fonts: {
    heading:
      '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    body: '"Catamaran", -apple-system, BlinkMacSystemFont, "Segoe UI",Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.5,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
  colors,
  shadows,
  text: {
    default: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 3,
    },
    block: {
      variant: "paragraph",
      fontFamily: "body",
      lineHeight: "body",
      fontSize: 3,
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
  },
  radii: {
    card: "1rem",
  },
  breakpoints: ["48em", "64em"],
  buttons: {
    primary: {
      "&:hover": {
        cursor: "pointer",
      },
      "&:disabled": {
        backgroundColor: "grayness",
        cursor: "not-allowed",
      },
      "&:focus": {
        outline: "none",
        transition: "box-shadow 0.2s",
        boxShadow: "0px 0px 1px 3px #4299e1",
      },
    },
    back: {
      backgroundColor: "transparent",
      padding: 0,
      color: "grayness",
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
      color: "grayness",
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
      "&:focus": {
        outline: "none",
        transition: "box-shadow 0.2s",
        boxShadow: "0px 0px 1px 3px #4299e1",
      },
    },
    secondary: {
      boxShadow: "card",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "black",
      },
    },
    navButton: {
      cursor: "pointer",
      textDecoration: "none",
      color: "text",
      "&:hover": {
        color: "primary",
      },
      "&:focus": {
        color: "primary",
      },
    },
    tabButton: {
      borderRadius: 0,
      position: "relative",
      outline: "transparent solid 2px",
      outlineOffset: "0px",
      background: "transparent",
      "&:hover": { cursor: "pointer" },
      "&:active": {
        backgroundColor: "highlight",
        transition: "background-color 0.3s ease-out",
      },
      "&:focus": {
        outline: "none",
        transition: "box-shadow 0.2s",
        boxShadow: "0px 0px 1px 3px #4299e1",
      },
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none",
      borderBottom: "2px solid",
      marginBottom: "-2px",
    },
  },
};
