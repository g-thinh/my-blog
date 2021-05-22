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
    mb={[3, 4]}
    sx={{ textAlign: "center", fontSize: [2, 3] }}
  >
    {children}
  </Heading>
);

export const TextBlock = ({ children }: Props): JSX.Element => (
  <Paragraph mb={[3, 4]} sx={{ fontSize: [2, 3] }}>
    {children}
  </Paragraph>
);
