import { Text, Card, Flex, Box } from "theme-ui";
import { format } from "date-fns";
import { Link } from "@components/index";
import { MarkdownFrontmatter } from "@ts/Posts";

export function BlogPostCard({
  frontmatter,
  full_slug,
}: Pick<MarkdownFrontmatter, "frontmatter" | "full_slug">) {
  const { title, description, published } = frontmatter;
  return (
    <Card
      bg="muted"
      mb={[3, 4]}
      sx={{
        position: "relative",
        textDecoration: "none",
        display: "flex",
        justifyContent: "center",
        borderRadius: "xl",
        "&:hover": {
          cursor: "pointer",
          boxShadow: "md",
          "& h3": {
            color: "primary",
          },
        },
        "&:focus-within": {
          cursor: "pointer",
          "& h3": {
            color: "primary",
          },
        },
      }}
    >
      <Link.Overlay href={full_slug} />
      <Flex p={[2, 3]} sx={{ width: "100%" }}>
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
            {format(new Date(published), "do MMMM, yyyy")}
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
              {title}
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
            {description}
          </Text>
          <Flex>
            <Link href={"test"} color="grayness" variant="card">
              Read More
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
