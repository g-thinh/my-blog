import NextLink from "next/link";
import { useRouter } from "next/router";
import { FiExternalLink } from "react-icons/fi";
import { Link as Anchor, Button, Text } from "theme-ui";
import { Icon } from "./Icon";

type RouteLinkProps = React.PropsWithChildren<{
  isActive?: boolean;
  noIcon?: boolean;
}> &
  React.ComponentProps<typeof Anchor>;

export function Link({
  href,
  isActive = false,
  children,
  noIcon = false,
  ...props
}: RouteLinkProps) {
  const router = useRouter();
  const isActiveLink = isActive && router.asPath === href;

  if (!href) {
    return (
      <Text
        sx={{ textDecoration: "underline", textDecorationColor: "primary" }}
      >
        {children}
      </Text>
    );
  }

  if (href.match(/^(https?:)?\/\//)) {
    return (
      <Anchor href={href} target="_blank" color="text" {...props}>
        {children}
        {!noIcon && <Icon ml={1} aria-hidden as={FiExternalLink} size={16} />}
      </Anchor>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Anchor color={isActiveLink ? "primary" : "text"} {...props}>
        {children}
      </Anchor>
    </NextLink>
  );
}

Link.Overlay = function LinkOverlay({
  children,
  href,
  ...props
}: RouteLinkProps) {
  return (
    <Link
      href={href}
      color="text"
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
        borderRadius: "md",
        "&:focus-visible": {
          color: "text",
          outline: "none",
          transition: "box-shadow 0.2s",
          boxShadow: "outline",
        },
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

Link.Button = function LinkButton({
  children,
  href,
  sx,
  ...props
}: RouteLinkProps) {
  return (
    <Link
      as={Button}
      href={href}
      sx={{ "&:hover": { textDecoration: "none" } }}
      {...props}
    >
      {children}
    </Link>
  );
};
