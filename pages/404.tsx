import { Container, Text } from "theme-ui";

export default function ErrorPage() {
  return (
    <Container
      my="auto"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Text
        as="h1"
        color="text"
        sx={{
          fontSize: [3, 4, 5],
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        404 Not Found. 😢
      </Text>
    </Container>
  );
}
