import { InternalLink, Note, TableLinks } from "@components/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_LINK,
  NODE_CODEBLOCK,
  NODE_HEADING,
  NODE_IMAGE,
  NODE_PARAGRAPH,
} from "storyblok-rich-text-react-renderer";
import styled from "styled-components";
import { Box, Heading, Image, Link, Paragraph, Text } from "theme-ui";

export const resolvers = {
  nodeResolvers: {
    [NODE_IMAGE]: (_children, { src }): JSX.Element => (
      <Text as="span" sx={{ display: "block", textAlign: "center" }}>
        <Image p={[0, 4]} src={src} />
      </Text>
    ),
    [NODE_PARAGRAPH]: (children: React.ReactNode): JSX.Element => {
      return (
        <Box mb={4}>
          <Paragraph>{children}</Paragraph>
        </Box>
      );
    },
    [NODE_HEADING]: (children: React.ReactNode): JSX.Element => {
      return (
        <Heading
          as="h4"
          color="primary"
          mb={[1, 2]}
          sx={{ fontWeight: 600, fontSize: [3, 4] }}
        >
          {children}
        </Heading>
      );
    },
    [NODE_CODEBLOCK]: (children: React.ReactNode): JSX.Element => {
      return (
        <Box py={[2, 3]} mb={4}>
          <StyledCodeBlock
            language="javascript"
            style={atomOneDarkReasonable}
            customStyle={{ padding: "1rem" }}
          >
            {children}
          </StyledCodeBlock>
        </Box>
      );
    },
  },
  defaultNodeResolvers: (_name: string, props): JSX.Element => {
    return (
      <div>
        <pre>
          <code>{JSON.stringify(props, undefined, 2)}</code>
        </pre>
      </div>
    );
  },
  markResolvers: {
    [MARK_LINK]: (children: React.ReactNode, props): JSX.Element => (
      <Link href={props.href} target="_blank" sx={{ textDecoration: "none" }}>
        <Text
          sx={{
            color: "primary",
            "&:hover": {
              color: "secondary",
            },
            fontSize: [3, 4],
          }}
        >
          {children}
        </Text>
      </Link>
    ),
    [MARK_BOLD]: (children: React.ReactNode): JSX.Element => (
      <Text
        sx={{
          fontWeight: 600,
          fontSize: [3, 4],
        }}
      >
        {children}
      </Text>
    ),
    [MARK_ITALIC]: (children: React.ReactNode): JSX.Element => (
      <Text
        sx={{
          fontSize: [3, 4],
        }}
      >
        {children}
      </Text>
    ),
    [MARK_CODE]: (children: React.ReactNode): JSX.Element => (
      <Text
        as="code"
        px={1}
        sx={{
          borderRadius: "0.475rem",
          filter: "brightness(90%)",
          fontFamily:
            "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New",
          color: "orange",
          backgroundColor: "muted",
        }}
      >
        {children}
      </Text>
    ),
  },
  blokResolvers: {
    Note: (props) => <Note data={props} />,
    "Table of Contents": (props): JSX.Element => {
      return <TableLinks items={props.Sections} />;
    },
    "Internal Link": (props): JSX.Element => {
      return <InternalLink data={props} />;
    },
  },
  defaultBlokResolver: (name: string, props): JSX.Element => {
    return (
      <div>
        <code>Missing blok resolver for blok type "{name}".</code>
        <pre>
          <code>{JSON.stringify(props, undefined, 2)}</code>
        </pre>
      </div>
    );
  },
};

const StyledCodeBlock = styled(SyntaxHighlighter)`
  width: 100%;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
`;
