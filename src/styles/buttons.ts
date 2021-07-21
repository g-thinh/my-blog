export const buttons = {
  primary: {
    borderRadius: "md",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "highlight",
    },
    "&:disabled": {
      backgroundColor: "grayness",
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: "none",
      transition: "box-shadow 0.5s",
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
} as const;
