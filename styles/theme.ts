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
    secondary: {
      boxShadow: "card",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "black",
      },
    },
  },
};
