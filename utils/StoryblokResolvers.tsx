import Image from "next/image";
import styled from "styled-components";
import { Link, Text, Box } from "theme-ui";
import {
  NODE_IMAGE,
  NODE_PARAGRAPH,
  MARK_LINK,
  NODE_CODEBLOCK,
  NODE_HEADING,
  MARK_CODE,
} from "storyblok-rich-text-react-renderer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import React from "react";

export const resolvers = {
  nodeResolvers: {
    [NODE_IMAGE]: (props): JSX.Element => (
      <Image src={props.src} height={200} width={200} {...props} />
    ),
    [NODE_PARAGRAPH]: (children: React.ReactNode): JSX.Element => {
      return (
        <Text as="p" mb={[2, 3]}>
          {children}
        </Text>
      );
    },
    [NODE_HEADING]: (children: React.ReactNode): JSX.Element => {
      return (
        <Text as="h3" color="primary" my={[3, 4]}>
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
};

const StyledCodeBlock = styled(SyntaxHighlighter)`
  width: 100%;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
`;
