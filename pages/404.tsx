import { Container } from "theme-ui";
import { Heading } from "@components/index";

export default function ErrorPage(): JSX.Element {
  return (
    <Container p={[2, 3]}>
      <Heading>404 Not Found. 😢</Heading>
    </Container>
  );
}
