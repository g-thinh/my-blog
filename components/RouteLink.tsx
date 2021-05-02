import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "theme-ui";

interface Props {
  href: string;
  index: number;
  isActive?: boolean;
  children: React.ReactNode;
}

export const RouteLink = ({
  href,
  index,
  isActive = true,
  children,
}: Props) => {
  const router = useRouter();
  const isActiveLink = isActive && router.asPath === href;
  return (
    <Link href={href} passHref>
      <Text
        as="a"
        px={[3, 4]}
        tabIndex={index}
        sx={{
          color: isActiveLink ? "primary" : "text",
          textDecoration: "none",
          fontSize: [2, 3],
          cursor: "pointer",
          "&:hover": {
            color: "primary",
          },
          "&:focus": {
            color: "primary",
          },
        }}
      >
        {children}
      </Text>
    </Link>
  );
};
