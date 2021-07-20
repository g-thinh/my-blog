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
import { PropsWithChildren, ComponentProps } from "react";
import styled from "styled-components";
import { Box, Heading, Image, Link, Paragraph, Text } from "theme-ui";

export const resolvers = {
  nodeResolvers: {
    [NODE_IMAGE]: function NodeImage(_children, { src, alt }) {
      return (
        <Text as="span" sx={{ display: "block", textAlign: "center" }}>
          <Image p={[0, 4]} src={src} alt={alt} />
        </Text>
      );
    },
    [NODE_PARAGRAPH]: function NodeParagraph(children: React.ReactNode) {
      return (
        <Box mb={4}>
          <Paragraph>{children}</Paragraph>
        </Box>
      );
    },
    [NODE_HEADING]: function NodeHeading(children: React.ReactNode) {
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
    [NODE_CODEBLOCK]: function NodeCodeblock(children: React.ReactNode) {
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
  defaultNodeResolvers: function DefaultNode(_name: string, props) {
    return (
      <div>
        <pre>
          <code>{JSON.stringify(props, undefined, 2)}</code>
        </pre>
      </div>
    );
  },
  markResolvers: {
    [MARK_LINK]: function MarkLink({
      children,
      href,
      ...props
    }: PropsWithChildren<{}> & ComponentProps<typeof Link>) {
      return (
        <Link
          href={href}
          target="_blank"
          sx={{ textDecoration: "none" }}
          {...props}
        >
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
      );
    },
    [MARK_BOLD]: function MarkBold({ children }: PropsWithChildren<{}>) {
      return (
        <Text
          sx={{
            fontWeight: 600,
            fontSize: [3, 4],
          }}
        >
          {children}
        </Text>
      );
    },
    [MARK_ITALIC]: function MarkItalic({ children }: PropsWithChildren<{}>) {
      return (
        <Text
          sx={{
            fontSize: [3, 4],
          }}
        >
          {children}
        </Text>
      );
    },
    [MARK_CODE]: function MarkCode(children: React.ReactNode) {
      return (
        <Text
          as="code"
          px={1}
          sx={{
            borderRadius: "md",
            filter: "brightness(90%)",
            fontFamily:
              "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New",
            color: "orange",
            backgroundColor: "muted",
          }}
        >
          {children}
        </Text>
      );
    },
  },
  blokResolvers: {
    Note: function NoteBlok(props) {
      return <Note data={props} />;
    },
    "Table of Contents": function TableOfContent(props) {
      return <TableLinks items={props.Sections} />;
    },
    "Internal Link": function InternalLink(props) {
      return <InternalLink data={props} />;
    },
  },
  defaultBlokResolver: function DefaultBlock(name: string, props) {
    return (
      <div>
        <code>Missing blok resolver for blok type &quot{name}&quot.</code>
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
