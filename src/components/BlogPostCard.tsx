import { Text, Card, Flex, Box } from "theme-ui";
import { Link } from "@components/Link";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { MarkdownFrontmatter } from "@ts/Posts";

dayjs.extend(advancedFormat);

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
      <Flex p={3} sx={{ width: "100%", flexDirection: ["column", "row"] }}>
        <Flex
          mb={[2, undefined]}
          sx={{
            flex: "1",
            justifyContent: ["flex-start", "center"],
            alignContent: "center",
          }}
        >
          <Text
            sx={{
              fontSize: [2, 3],
              textAlign: "center",
              color: "grayness",
            }}
          >
            {dayjs(published).format("MMM Do, YYYY")}
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
        </Flex>
      </Flex>
    </Card>
  );
}
