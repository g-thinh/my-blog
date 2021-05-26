import { Heading, Paragraph } from "theme-ui";

interface Props {
  children: React.ReactNode;
  isCenter?: boolean;
}

export const MainHeading = ({
  children,
  isCenter = true,
}: Props): JSX.Element => (
  <Heading
    as="h1"
    color="text"
    mb={[2, 3]}
    sx={{
      fontSize: [5, 6],
      textAlign: isCenter ? "center" : "left",
      fontWeight: "bold",
    }}
  >
    {children}
  </Heading>
);

export const Subheading = ({ children }: Props): JSX.Element => (
  <Heading
    as="h2"
    color="text"
    mb={4}
    sx={{
      textAlign: "center",
      fontSize: [3, 4],
      fontWeight: "body",
    }}
  >
    {children}
  </Heading>
);

export const TextBlock = ({ children }: Props): JSX.Element => (
  <Paragraph sx={{ fontSize: [3, 4] }}>{children}</Paragraph>
);

export const TextHeading = ({ children }: Props): JSX.Element => (
  <Heading
    as="h4"
    color="primary"
    mb={[1, 2]}
    sx={{ fontWeight: 600, fontSize: [3, 4] }}
  >
    {children}
  </Heading>
);
