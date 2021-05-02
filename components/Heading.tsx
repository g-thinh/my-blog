import { Text } from "theme-ui";

export const Heading = ({ children, isCenter = true }) => (
  <Text
    as="h1"
    color="text"
    my={[2, 3]}
    sx={{
      fontSize: [4, 5],
      textAlign: isCenter ? "center" : "left",
      fontWeight: "bold",
    }}
  >
    {children}
  </Text>
);
