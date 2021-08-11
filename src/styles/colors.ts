export const colors2 = {
  text: "#000",
  background: "#EFF0F5",
  // background: "#fff",
  // primary: "#51AEA4",
  primary: "#3182CE",
  secondary: "#F7B108",
  // muted: "#f5f6f9",
  muted: "#e1e5f2",
  accent: "#63b3ed",
  // highlight: "#B6BBD3",
  highlight: "#E53E3E",
  grayness: "#343a40",

  modes: {
    dark: {
      text: "#F0F5FA",
      background: "#222639",
      // primary: "#71BCB4",
      primary: "#4299E1",
      secondary: "#F8BF35",
      highlight: "#D2D5E4",
      // muted: "rgba(0, 0, 0, 0.12)",
      muted: "#131520",
      accent: "#90cdf4",
      grayness: "#6c757d",
    },
  },
} as const;

const light = {
  primary: "#3182CE",
  secondary: "#F7B108",
  accent: "#00A3C4",
  text: "#000",
  background: "#EFF0F5",
  muted: "#e1e5f2",
  highlight: "#9F7AEA",
  grayness: "#6c757d",
};

const dark = {
  primary: "#4299E1",
  secondary: "#F8BF35",
  accent: "#90cdf4",
  text: "#F0F5FA",
  background: "#222639",
  muted: "#131520",
  highlight: "#B794F4",
  grayness: "#6c757d",
};

export const colors = {
  ...light,
  modes: {
    dark,
  },
};
