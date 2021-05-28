import { Container } from "theme-ui";
import { MainHeading } from "@components/index";
import { NextPageContext } from "next";

interface Props {
  statusCode: number;
}

interface Context extends NextPageContext {}

export default function DynamicErrorPage({ statusCode }: Props) {
  return (
    <Container p={[2, 3]}>
      <MainHeading>{statusCode} Error</MainHeading>
    </Container>
  );
}

DynamicErrorPage.getInitialProps = ({ res, err }: Context) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
