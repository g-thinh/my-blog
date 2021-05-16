import { Text, Card, Flex } from "theme-ui";
import { format } from "date-fns";
import Link from "next/link";

export const BlogPostCard = ({ data }): JSX.Element => {
  return (
    <Link href={data.full_slug}>
      <Card
        bg="muted"
        p={[2, 3]}
        mb={[3, 4]}
        sx={{
          display: ["flex", "block"],
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
            sx={{
              flex: "1",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text as="h3" mt={1} sx={{ textAlign: "center", color: "grey" }}>
              {format(new Date(data.first_published_at), "do MMMM, yyyy")}
            </Text>
          </Flex>
          <Flex sx={{ flexDirection: "column", flex: "3" }}>
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
            <Text
              as="p"
              color="text"
              my={[1, 3]}
              sx={{
                textAlign: "left",
                fontSize: [1],
              }}
            >
              {data.content.preview}
            </Text>
            <Link href={data.full_slug} passHref>
              <Text
                as="a"
                color="grey"
                sx={{
                  width: "fit-content",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Read More
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
