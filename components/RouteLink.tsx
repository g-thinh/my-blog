import { ComponentProps, PropsWithChildren } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Text, Button, Link as Anchor } from "theme-ui";

type RouteLinkProps = PropsWithChildren<{
  href: string;
  isActive?: boolean;
}> &
  ComponentProps<typeof NextLink>;

export const RouteLink = ({
  href,
  isActive = true,
  children,
  ...props
}: RouteLinkProps) => {
  const router = useRouter();
  const isActiveLink = isActive && router.asPath === href;
  return (
    <NextLink href={href} passHref {...props}>
      <Anchor
        px={[2, 3]}
        sx={{
          fontFamily: "body",
          fontSize: [2, 3],
          color: isActiveLink ? "primary" : "text",
          textDecoration: "none",
          "&:hover": {
            color: "primary",
          },

          "&:focus": {
            outline: "none",
            color: "primary",
          },
        }}
      >
        {children}
      </Anchor>
    </NextLink>
  );
};
