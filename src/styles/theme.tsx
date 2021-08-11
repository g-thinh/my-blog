import { Theme, ThemeUIContextValue, useThemeUI } from "theme-ui";
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
    code: "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New",
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
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
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

export type ExactTheme = Replace<MyTheme, "colors", WithoutDark>;

interface ExactContextValue extends Omit<ThemeUIContextValue, "theme"> {
  theme: ExactTheme;
}
export const useTheme = useThemeUI as unknown as () => ExactContextValue;
