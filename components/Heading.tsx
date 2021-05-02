import { Text } from "theme-ui";

export const Heading = ({ children }) => (
  <Text
    as="h1"
    color="text"
    my={[2, 3]}
    sx={{
      fontSize: [4, 5],
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    {children}
  </Text>
);
