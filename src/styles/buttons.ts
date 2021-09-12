import { darken, transparentize } from "@theme-ui/color";

export const buttons = {
  primary: {
    color: "background",
    fontWeight: 600,
    borderRadius: "md",
    backgroundColor: "primary",
    outline: "2px solid transparent",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: darken("primary", 0.05),
    },
    "&:disabled": {
      backgroundColor: "grayness",
      cursor: "not-allowed",
    },
    "&:active": {
      backgroundColor: darken("primary", 0.1),
      outline: "1px solid primary",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
    },
    "&:focus-visible, :focus-within": {
      outline: "none",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
    },
  },
  nofill: {
    color: "primary",
    borderRadius: "md",
    backgroundColor: "transparent",
    border: "2px solid",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: transparentize("primary", 0.8),
    },
    "&:disabled": {
      backgroundColor: "grayness",
      cursor: "not-allowed",
    },
    "&:active": {
      backgroundColor: transparentize("primary", 0.85),
      outline: "none",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
    },
    "&:focus-visible": {
      outline: "none",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
    },
  },
  secondary: {
    color: "background",
    fontWeight: 600,
    borderRadius: "md",
    backgroundColor: "secondary",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: darken("secondary", 0.05),
    },
    "&:disabled": {
      backgroundColor: "grayness",
      cursor: "not-allowed",
    },
    "&:active": {
      backgroundColor: darken("secondary", 0.1),
      outline: "none",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
    },
    "&:focus-visible": {
      outline: "none",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
    },
  },
  dropdown: {
    color: "text",
    borderRadius: "md",
    backgroundColor: darken("background", 0.05),
    span: {
      fontWeight: 600,
    },
    "&:hover": {
      cursor: "pointer",
      backgroundColor: darken("background", 0.1),
    },
    "&:disabled": {
      backgroundColor: "grayness",
      cursor: "not-allowed",
    },
    "&:focus": {
      backgroundColor: darken("background", 0.1),
    },
    "&:active": {
      backgroundColor: darken("background", 0.15),
      outline: "none",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
    },
    "&:focus-visible": {
      outline: "none",
      transition: "box-shadow 0.2s",
      boxShadow: "outline",
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
};
