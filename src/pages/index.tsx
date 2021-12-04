import { Container, Box, Flex, Heading, Divider, Text } from "theme-ui";
import { SEO } from "@components/SEO";
import { MDXComponent } from "@components/MDXComponent";
import { Link } from "@components/Link";
import {
  getSinglePost,
  getAllPosts,
  LANDING_PATH,
  POSTS_PATH,
} from "@utils/mdxUtils";
import { SinglePost, Posts } from "@ts/Posts";
import dayjs from "dayjs";

export async function getStaticProps() {
  const { markdownContent, frontmatter } = await getSinglePost(
    "home",
    LANDING_PATH
  );

  const posts = await getAllPosts(POSTS_PATH);
  return {
    props: { markdownContent, frontmatter, posts },
  };
}

export default function HomePage({
  markdownContent,
  frontmatter,
  posts,
}: SinglePost & Posts) {
  return (
    <Container p={[2, 3]}>
      <SEO meta={frontmatter} />
      <Flex
        sx={{
          flexFlow: "row",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
          {frontmatter.title}
        </Heading>
      </Flex>
      <Box py={3}>
        <MDXComponent code={markdownContent} />
      </Box>
      <Box
        p={3}
        mb={5}
        bg="muted"
        sx={{
          borderRadius: "md",
        }}
      >
        <Text
          py={[2, 3]}
          sx={{
            fontSize: [3, 4],
            textAlign: "left",
            width: "100%",
          }}
        >
          Latest Posts
        </Text>
        <Divider />
        <Box as="ul">
          {posts.map(({ frontmatter, full_slug }) => {
            return (
              !frontmatter.isDraft && (
                <Box as="li" py={2} key={frontmatter.title}>
                  <Link href={full_slug}>
                    {`${dayjs(frontmatter.published).format(
                      "MMM DD, YYYY"
                    )} - ${frontmatter.title}`}
                  </Link>
                </Box>
              )
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
