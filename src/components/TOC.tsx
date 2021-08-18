import {
  Flex,
  Container,
  Heading,
  Divider,
  Text,
  IconButton,
} from "@theme-ui/components";
import React from "react";
import { Link } from "@components/Link";
import { darken } from "@theme-ui/color";

type ChildrenProps = React.PropsWithChildren<{}>;

function stringToSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/^/, "#");
}

export function TOC({
  children,
  ...props
}: ChildrenProps & React.ComponentProps<typeof Container>) {
  //this is to remove mdx newlines that are being added
  const NewChildren = React.Children.map(children, (child) => {
    if (typeof child !== "string") {
      return child;
    }
  });

  return (
    <Container
      bg="muted"
      mb={4}
      sx={{
        borderRadius: "lg",
        boxShadow: "md",
        width: ["95%", "80%"],
      }}
      {...props}
    >
      <Heading
        px={3}
        pt={3}
        as="p"
        color="primary"
        sx={{ fontSize: [3, 4], textAlign: "left" }}
      >
        Table of Contents
      </Heading>
      <Divider color="grayness" />
      <Flex sx={{ flexDirection: "column" }}>
        {NewChildren.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { id: index + 1 });
          }
        })}
      </Flex>
    </Container>
  );
}

TOC.Item = function TOCItem({
  children,
  id,
  ...props
}: ChildrenProps & React.ComponentProps<typeof Link>) {
  const slug = stringToSlug(children);
  return (
    <Link
      href={slug}
      px={3}
      py={2}
      sx={{
        "&:hover": {
          textDecoration: "none",
          span: {
            textDecoration: "underline",
          },
        },
      }}
      {...props}
    >
      <IconButton
        as="div"
        mr={3}
        sx={{
          backgroundColor: darken("muted", 0.2),
          border: "1px solid",
          borderColor: "grayness",
          borderRadius: "50%",
        }}
      >
        {id}
      </IconButton>
      <Text>{children}</Text>
    </Link>
  );
};
