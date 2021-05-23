import { Text, Card, Flex, Box } from "theme-ui";
import { format } from "date-fns";
import Link from "next/link";

export const BlogPostCard = ({ data }): JSX.Element => {
  return (
    <Link href={data.full_slug} passHref>
      <Card
        as="a"
        bg="muted"
        p={[2, 3]}
        mb={[3, 4]}
        sx={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          borderRadius: "card",
          "&:hover": {
            cursor: "pointer",
            boxShadow: "card",
            "& h3": {
              color: "primary",
            },
          },
          "&:focus-within": {
            cursor: "pointer",
            boxShadow: "card",
            "& h3": {
              color: "primary",
            },
          },
        }}
      >
        <Flex sx={{ width: "100%" }}>
          <Flex
            mx={3}
            sx={{
              flex: "1",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              as="h3"
              sx={{ fontSize: [2, 3], textAlign: "center", color: "grayness" }}
            >
              {format(new Date(data.first_published_at), "do MMMM, yyyy")}
            </Text>
          </Flex>
          <Flex sx={{ flexFlow: "column nowrap", flex: "3" }}>
            <Box mb={2}>
              <Text
                as="h3"
                color="text"
                sx={{
                  fontSize: [2, 3],
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                {data.name}
              </Text>
            </Box>
            <Text
              as="p"
              color="text"
              sx={{
                flexGrow: 1,
                fontSize: [2, 3],
              }}
            >
              {data.content.preview}
            </Text>
            <Flex>
              <Text
                color="grayness"
                sx={{
                  fontSize: [2, 3],
                  width: "fit-content",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Read More
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
