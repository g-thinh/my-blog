import { transparentize } from "@theme-ui/color";
import { Box, Text } from "theme-ui";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { GetCodeStyle } from "@styles/code";
import rangeParser from "parse-numeric-range";
import React from "react";

type CodeSnippetProps = {
  code: string;
  className?: string;
  title?: string;
  hl?: number;
  showlineNumbers?: boolean;
};

type TextProps = React.PropsWithChildren<{}> &
  React.ComponentProps<typeof Text>;

type BoxProps = React.PropsWithChildren<{}> & React.ComponentProps<typeof Box>;

export function InlineCode({ children, ...props }: TextProps) {
  return (
    <Text
      as="code"
      bg="muted"
      px={2}
      py={1}
      sx={{
        fontSize: [2, 3],
        borderRadius: "md",
        fontFamily: "code",
      }}
      {...props}
    >
      {children}
    </Text>
  );
}

function Code({ children, ...props }: BoxProps) {
  return (
    <Box mb={4} sx={{ position: "relative" }} {...props}>
      {children}
    </Box>
  );
}

Code.Title = function CodeTitle({ children, ...props }: TextProps) {
  return (
    <Text
      color="text"
      bg="muted"
      py={2}
      px={4}
      ml={4}
      mb={-1}
      sx={{
        fontWeight: "bolder",
        fontSize: [2, 3],
        textTransform: "uppercase",
        borderRadius: "lg",
        userSelect: "none",
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

Code.Pre = function CodePre({
  children,
  className,
  style,
  ...props
}: BoxProps) {
  return (
    <Box
      as="pre"
      className={className}
      style={style}
      sx={{
        backgroundColor: "transparent",
        width: "100%",
        overflow: "auto",
        padding: 3,
        borderRadius: "lg",
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "grayness",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

function Line({ children, ...props }: BoxProps) {
  return (
    <Box px={2} sx={{ display: "table-cell" }} {...props}>
      {children}
    </Box>
  );
}

Line.Number = function LineNumber({ children, ...props }: TextProps) {
  return (
    <Text
      color="grayness"
      sx={{
        display: "table-cell",
        textAlign: "right",
        paddingRight: "1em",
        userSelect: "none",
        opacity: 0.8,
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

Line.Content = function LineContent({ children, ...props }: TextProps) {
  return (
    <Text sx={{ display: "table-cell" }} {...props}>
      {children}
    </Text>
  );
};

function getShouldHighlightLine(hl: unknown) {
  if (hl) {
    const lineNumbers = rangeParser(hl);
    return (index) => lineNumbers.includes(index + 1);
  }
  return () => false;
}

export function CodeSnippet({
  code,
  className,
  title,
  hl,
  showlineNumbers,
}: CodeSnippetProps) {
  const language = className?.replace(/language-/, "") as Language;
  const shouldHighlightLine = getShouldHighlightLine(hl);

  return (
    <Code>
      <Code.Title>{language}</Code.Title>
      <Highlight
        {...defaultProps}
        theme={GetCodeStyle()}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Code.Pre className={className} style={style}>
            {title && <Text color="grayness" ml={3}>{`//${title}`}</Text>}
            {tokens.map((line, index) => (
              <Line
                key={index}
                {...getLineProps({ line, key: index })}
                sx={{
                  borderRadius: "sm",
                  backgroundColor: shouldHighlightLine(index)
                    ? transparentize("accent", 0.8)
                    : undefined,
                }}
              >
                {showlineNumbers && <Line.Number>{index + 1}</Line.Number>}
                <Line.Content sx={{ display: "table-cell" }}>
                  {line.map((token, key) => (
                    <Text
                      as="span"
                      key={key}
                      {...getTokenProps({ token, key })}
                      sx={{
                        fontSize: [2, 3],
                        fontFamily: "code",
                        lineHeight: 1.4,
                      }}
                    />
                  ))}
                </Line.Content>
              </Line>
            ))}
          </Code.Pre>
        )}
      </Highlight>
    </Code>
  );
}