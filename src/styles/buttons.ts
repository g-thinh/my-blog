import { darken } from "@theme-ui/color";

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
    "&:focus-visible": {
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
    },
    "&:disabled": {
      backgroundColor: "grayness",
      cursor: "not-allowed",
    },
    "&:active": {
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
};
