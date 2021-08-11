import NextLink from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, PropsWithChildren } from "react";
import { FiExternalLink } from "react-icons/fi";
import { Link as Anchor } from "theme-ui";
import { transparentize, darken } from "@theme-ui/color";

type RouteLinkProps = PropsWithChildren<{
  isActive?: boolean;
}> &
  ComponentProps<typeof Anchor>;

export const Link = ({
  href,
  isActive = false,
  children,
  sx,
  ...props
}: RouteLinkProps) => {
  const router = useRouter();
  const isActiveLink = isActive && router.asPath === href;

  if (href.match(/^(https?:)?\/\//)) {
    return (
      <Anchor
        href={href}
        color="text"
        sx={{
          ":hover": {
            color: "teal.regular",
            textDecoration: "underline",
          },
          ":focus-visible": {
            color: "teal.regular",
            textDecoration: "underline",
          },
          svg: {
            marginLeft: [1],
          },
          ...sx,
        }}
        {...props}
      >
        {children}
        <FiExternalLink size={14} aria-hidden={true} />
      </Anchor>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Anchor
        color="text"
        sx={{
          color: isActiveLink && "primary",
          ":hover": {
            color: "teal.regular",
            textDecoration: "underline",
          },
          ":focus-visible": {
            color: "teal.regular",
            textDecoration: "underline",
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </Anchor>
    </NextLink>
  );
};

Link.Overlay = function LinkOverlay({
  children,
  href,
  sx,
  ...props
}: RouteLinkProps) {
  return (
    <Link
      href={href}
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
        ...sx,
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
      href={href}
      px={3}
      py={2}
      sx={{
        color: "text",
        backgroundColor: "transparent",
        borderRadius: "md",
        border: "2px solid",
        borderColor: transparentize("text", 0.4),
        textDecoration: "none",
        "&:hover": {
          cursor: "pointer",
          textDecoration: "none",
          backgroundColor: darken("background", 0.1),
        },
        "&:focus-visible": {
          textDecoration: "none",
          outline: "none",
          transition: "box-shadow 0.2s",
          boxShadow: "outline",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
