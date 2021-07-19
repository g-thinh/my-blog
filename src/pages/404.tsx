import { Container, Heading } from "theme-ui";

export default function ErrorPage() {
  return (
    <Container p={[2, 3]}>
      <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
        404 Not Found. 😢
      </Heading>
    </Container>
  );
}
