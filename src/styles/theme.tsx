import { Theme, Button } from "theme-ui";
import { colors } from "./colors";
import { text } from "./text";
import { shadows } from "./shadows";
import { links } from "./links";
import { buttons } from "./buttons";

const makeTheme = <T extends Theme>(t: T): T => {
  return t;
};

export const theme = makeTheme({
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
  text,
  radii: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  breakpoints: ["48em", "64em"],
  buttons,
  links,
  styles: {
    a: {
      display: "inline-flex",
      fontFamily: "body",
      color: "text",
      textDecoration: "none",
      alignItems: "center",
    },
  },
});

export type MyTheme = typeof theme;

export type Replace<T extends object, Keys extends keyof T, NewType> = {
  [key in keyof T]: key extends Keys ? NewType : T[key];
};

type WithoutDark = Omit<MyTheme["colors"], "modes">;

// export type ExactTheme = Omit<MyTheme, "colors"> & { colors: WithoutDark };

export type ExactTheme = Replace<MyTheme, "colors", WithoutDark>;
