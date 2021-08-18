import {
  Image,
  Link,
  Note,
  useToast,
  CodeSnippet,
  InlineCode,
} from "@components/index";
import { TOC } from "@components/TOC";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";
import {
  Box,
  Divider,
  Paragraph,
  Text,
  Flex,
  Heading as H,
  IconButton,
} from "theme-ui";
import { FiLink } from "react-icons/fi";

type PreProps = {
  children: React.ReactElement;
  title?: string;
  hl?: any;
  showlineNumbers?: boolean;
};

function stringToId(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function H1(props: React.ComponentProps<typeof H>) {
  return <H as="h1" color="primary" {...props} />;
}

export function H2({ children, ...props }: React.ComponentProps<typeof H>) {
  const slug: string = stringToId(children);
  const { dispatch } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href + "#" + slug);
    dispatch({ type: "ADD", text: "Copied link to clipboard" });
  };

  return (
    <Flex
      mb={2}
      sx={{
        alignItems: "center",
        "&:hover button": {
          visibility: "visible",
        },
      }}
    >
      <H as="h2" color="secondary" id={slug} {...props}>
        {children}
      </H>
      <IconButton
        ml={2}
        color="grayness"
        sx={{
          visibility: "hidden",
          "&:hover": {
            color: "highlight",
            cursor: "pointer",
          },
        }}
        onClick={handleClick}
      >
        <FiLink size={18} />
      </IconButton>
    </Flex>
  );
}

export function H3(props: React.ComponentProps<typeof H>) {
  return (
    <H as="h3" mb={2} color="accent" sx={{ fontSize: [3, 4] }} {...props} />
  );
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
  h3: H3,
  pre: function renderPre({ children, title, hl, showlineNumbers }: PreProps) {
    return (
      <CodeSnippet
        code={children.props.children}
        className={children.props.className}
        title={title}
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
  TOC,
  Link,
  Flex,
  Box,
};

export function MDXComponent({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}
