import NextLink from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, PropsWithChildren } from "react";
import { FiExternalLink } from "react-icons/fi";
import { Link as Anchor } from "theme-ui";

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
          fontFamily: "body",
          color: "text",
          fontSize: [3, 4],
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",

          ":hover": {
            color: "primary",
            textDecoration: "underline",
          },

          ":focus-visible": {
            color: "primary",
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
          fontFamily: "body",
          fontSize: [3, 4],
          color: isActiveLink && "primary",
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",

          ":hover": {
            color: "primary",
            textDecoration: "underline",
          },

          ":focus-visible": {
            color: "primary",
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

        //Overwrite these defaults
        textDecoration: "none",
        "&:focus-visible": {
          outline: "none",
          transition: "box-shadow 0.2s",
          boxShadow: "0px 0px 1px 3px #4299e1",
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
      bg="muted"
      px={3}
      py={2}
      sx={{
        fontFamily: "body",
        fontSize: [3, 4],
        borderRadius: "md",

        //Overwrite these defaults
        textDecoration: "none",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "highlight",
        },
        "&:focus-visible": {
          outline: "none",
          transition: "box-shadow 0.2s",
          boxShadow: "0px 0px 1px 3px #4299e1",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
