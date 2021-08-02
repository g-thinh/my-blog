import {
  InternalLink,
  Note,
  NoteProps,
  TableLinks,
  Link,
} from "@components/index";
import { render } from "storyblok-rich-text-react-renderer-ts";
import { RenderOptionsProps } from "storyblok-rich-text-react-renderer-ts";
import { Box, Heading, Image, Paragraph, Text, useColorMode } from "theme-ui";
import { Code } from "@components/Code";

export const resolvers: RenderOptionsProps = {
  nodeResolvers: {
    image: function NodeImage(_children, { src, alt }) {
      return (
        <Text as="span" sx={{ display: "block", textAlign: "center" }}>
          <Image p={[0, 4]} src={src} alt={alt} />
        </Text>
      );
    },
    paragraph: function NodeParagraph(children) {
      return (
        <Box mb={4}>
          <Paragraph>{children}</Paragraph>
        </Box>
      );
    },
    heading: function NodeHeading(children) {
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
    code_block: function NodeCodeblock(props) {
      return (
        <Box py={[2, 3]} mb={4}>
          <Code>{props}</Code>
        </Box>
      );
    },
  },
  defaultStringResolver: function DefaultNode(str) {
    return <Paragraph>{str}</Paragraph>;
  },
  markResolvers: {
    link: function MarkLink(children, href) {
      return (
        <Link color="accent" href={href.href}>
          {children}
        </Link>
      );
    },
    bold: function MarkBold(children) {
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
    italic: function MarkItalic(children) {
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
    code: function MarkCode(children) {
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
    Note: function NoteBlok({ text }: NoteProps) {
      return <Note text={text} />;
    },
    "Table of Contents": function TableOfContent(props) {
      return <TableLinks items={props.Sections} />;
    },
    "Internal Link": function TextLink(props) {
      return <InternalLink data={props} />;
    },
  },
  defaultBlokResolver: function DefaultBlock(name, props) {
    return (
      <div>
        <code>Missing blok resolver for blok type {name}</code>
        <pre>
          <code>{JSON.stringify(props, undefined, 2)}</code>
        </pre>
      </div>
    );
  },
};

export function renderRichText(document, defaultResolvers = resolvers) {
  return render(document, defaultResolvers);
}
