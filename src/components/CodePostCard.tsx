import { Box, Card, Divider, Text, Flex } from "theme-ui";
import { format } from "date-fns";
import Link from "next/link";

export const CodePostCard = ({ data }): JSX.Element => {
  const post = data;
  return (
    <Link href={post.full_slug} passHref>
      <Card
        as="a"
        p={[2, 3]}
        sx={{
          textDecoration: "none",
          display: "flex",
          flexFlow: "column nowrap",
          borderRadius: "xl",
          "&:hover": {
            cursor: "pointer",
            boxShadow: "card",
            backgroundColor: "muted",
            "& h3": {
              color: "primary",
            },
          },
          "&:focus-within": {
            cursor: "pointer",
            boxShadow: "card",
            backgroundColor: "muted",
            "& h3": {
              color: "primary",
            },
          },
        }}
      >
        <Divider />
        <Flex sx={{ flex: "1", flexFlow: "column nowrap" }}>
          <Box mb={2}>
            <Text
              as="h3"
              color="secondary"
              sx={{
                fontSize: [2, 3],
                fontWeight: "bold",
              }}
            >
              {post.name}
            </Text>
            <Text color="grayness" sx={{ fontSize: [2, 3] }}>
              {format(new Date(post.published_at), "MMM d, yyyy")}
            </Text>
          </Box>

          <Text
            as="p"
            color="text"
            sx={{
              fontSize: [2, 3],
              flexGrow: 1,
            }}
          >
            {post.content.preview}
          </Text>
          <Flex>
            <Text
              color="grayness"
              my={2}
              sx={{
                fontSize: [2, 3],
                width: "fit-content",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Show Me⏵
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
