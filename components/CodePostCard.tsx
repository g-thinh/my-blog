import { Box, Card, Divider, Text, Flex } from "theme-ui";
import Link from "next/link";

export const CodePostCard = ({ data }): JSX.Element => {
  const post = data;
  return (
    <Link href={post.full_slug}>
      <Card
        p={[2, 3]}
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          borderRadius: "card",
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
          <Box>
            <Text
              as="h3"
              color="secondary"
              mb={2}
              sx={{
                fontSize: [2, 3],
                fontWeight: "bold",
              }}
            >
              {post.name}
            </Text>
          </Box>
          <Text
            as="p"
            color="text"
            sx={{
              fontSize: [1],
              flexGrow: 1,
            }}
          >
            {post.content.preview}
          </Text>
          <Flex>
            <Link href={post.full_slug} passHref>
              <Text
                as="a"
                color="grey"
                my={2}
                sx={{
                  width: "fit-content",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Show Me⏵
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
