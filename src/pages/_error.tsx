import { Container, Heading } from "theme-ui";
import { NextPageContext } from "next";

type ErrorProps = {
  statusCode: number;
};

interface Context extends NextPageContext {}

export default function DynamicErrorPage({ statusCode }: ErrorProps) {
  return (
    <Container p={[2, 3]}>
      <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
        {statusCode} Error
      </Heading>
    </Container>
  );
}

DynamicErrorPage.getInitialProps = ({ res, err }: Context) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
