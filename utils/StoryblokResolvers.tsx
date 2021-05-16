import { InternalLink, TableLinks } from "@components/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  MARK_CODE,
  MARK_LINK,
  NODE_CODEBLOCK,
  NODE_HEADING,
  NODE_IMAGE,
  NODE_PARAGRAPH,
} from "storyblok-rich-text-react-renderer";
import styled from "styled-components";
import { Flex, Box, Link, Message, Text, Image } from "theme-ui";

export const resolvers = {
  nodeResolvers: {
    [NODE_IMAGE]: (children, { src }): JSX.Element => (
      <Flex
        sx={{
          justifyContent: "center",
        }}
      >
        <Image my={2} p={[0, 4]} src={src} />
      </Flex>
    ),
    [NODE_PARAGRAPH]: (children: React.ReactNode): JSX.Element => {
      return (
        <Text as="p" mb={[3, 4]}>
          {children}
        </Text>
      );
    },
    [NODE_HEADING]: (children: React.ReactNode): JSX.Element => {
      return (
        <Text
          as="h3"
          color="primary"
          mt={[3, 4]}
          mb={[1, 2]}
          sx={{ fontSize: 3 }}
        >
          {children}
        </Text>
      );
    },
    [NODE_CODEBLOCK]: (children: React.ReactNode): JSX.Element => {
      return (
        <Box py={[2, 3]}>
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
  defaultNodeResolvers: (name: string, props): JSX.Element => {
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
      <Link
        href={props.href}
        target="_blank"
        sx={{
          textDecoration: "none",
          color: "primary",
          "&:hover": {
            color: "secondary",
          },
        }}
      >
        {children}
      </Link>
    ),
    [MARK_CODE]: (children: React.ReactNode): JSX.Element => (
      <Text
        as="code"
        p={1}
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
    ["Note"]: (props): JSX.Element => (
      <Message my={[3, 4]}>{props.text}</Message>
    ),
    ["Table of Contents"]: (props): JSX.Element => {
      return <TableLinks items={props.Sections} />;
    },
    ["Internal Link"]: (props): JSX.Element => {
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
