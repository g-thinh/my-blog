import { Container } from "theme-ui";
import { MainHeading } from "@components/index";

export default function ErrorPage(): JSX.Element {
  return (
    <Container p={[2, 3]}>
      <MainHeading>404 Not Found. 😢</MainHeading>
    </Container>
  );
}
