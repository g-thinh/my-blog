import { Image, Link, Note } from "@components/index";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { Box, Divider, Paragraph, Text, Heading as H } from "theme-ui";
import React from "react";
import { CodeSnippet, InlineCode } from "@components/CodeSnippet";

type PreProps = {
  children: React.ReactElement;
  filename?: string;
  hl?: any;
  showlineNumbers?: boolean;
};

export function H1(props: React.ComponentProps<typeof H>) {
  return <H as="h1" color="primary" {...props} />;
}

export function H2(props: React.ComponentProps<typeof H>) {
  return <H as="h2" color="secondary" {...props} />;
}

const components = {
  a: function RenderLink(props: React.ComponentProps<typeof Link>) {
    return <Link color="accent" {...props} />;
  },
  p: function renderParagraph(props: React.ComponentProps<typeof Paragraph>) {
    return <Paragraph mb={4} {...props} />;
  },
  h1: H1,
  h2: H2,
  pre: function renderPre({
    children,
    filename,
    hl,
    showlineNumbers,
  }: PreProps) {
    return (
      <CodeSnippet
        code={children.props.children}
        className={children.props.className}
        title={filename}
        hl={hl}
        showlineNumbers={showlineNumbers}
      />
    );
  },
  code: InlineCode,
  ul: function renderUL({ children }: React.PropsWithChildren<{}>) {
    return (
      <Box as="ul" mb={4} sx={{ listStyle: "inside" }}>
        {children}
      </Box>
    );
  },
  li: function renderLI({ children }: React.PropsWithChildren<{}>) {
    return <Text as="li">{children}</Text>;
  },
  ol: function renderOL({ children }: React.PropsWithChildren<{}>) {
    return (
      <Box
        as="ol"
        mb={4}
        sx={{ listStyle: "inside", listStyleType: "decimal" }}
      >
        {children}
      </Box>
    );
  },
  H1,
  H2,
  Divider,
  Image,
  Note,
};

export function MDXComponent({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}
