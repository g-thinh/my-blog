import Image from "next/image";
import { Link, Text } from "theme-ui";
import {
  NODE_IMAGE,
  NODE_PARAGRAPH,
  MARK_LINK,
} from "storyblok-rich-text-react-renderer";

export const resolvers = {
  nodeResolvers: {
    [NODE_IMAGE]: (children, props) => (
      <Image src={props.src} height={200} width={200} {...props} />
    ),
    [NODE_PARAGRAPH]: (children) => {
      return <Text>{children}</Text>;
    },
  },
  markResolvers: {
    [MARK_LINK]: (children, props) => (
      <Link
        href={props.href}
        target="_blank"
        sx={{
          textDecoration: "none",
          color: "primary",
          "&:hover": {
            color: "secondary",
          },
        }}
      >
        {children}
      </Link>
    ),
  },
};
