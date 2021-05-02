import { Text } from "theme-ui";

export const Subheading = ({ children }) => (
  <Text
    as="h2"
    color="text"
    mb={[3, 4]}
    sx={{ textAlign: "center", fontSize: [3] }}
  >
    {children}
  </Text>
);
