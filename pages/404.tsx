import { Container } from "theme-ui";
import { Heading } from "@components/index";

export default function ErrorPage() {
  return (
    <Container
      my="auto"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Heading>404 Not Found. 😢</Heading>
    </Container>
  );
}
