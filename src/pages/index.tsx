import { Container, Box, Flex, Heading, Divider, Text } from "theme-ui";
import { SEO, MDXComponent, Link } from "@components/index";
import {
  getSinglePost,
  getAllPosts,
  LANDING_PATH,
  POSTS_PATH,
} from "@utils/mdxUtils";
import { SinglePost, Posts } from "@ts/Posts";
import { useColorMode } from "theme-ui";

import reactDark from "../../public/reactDark.json";
import reactLight from "../../public/reactLight.json";
import Lottie from "react-lottie";

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
  const [colorMode] = useColorMode();
  const isDark = colorMode === "dark";

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: isDark ? reactDark : reactLight,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container p={[2, 3]}>
      <SEO meta={frontmatter} />
      <Flex
        sx={{
          flexFlow: "column",
          justifyContent: "center",
        }}
      >
        <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
          {frontmatter.title}
        </Heading>
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie options={defaultOptions} height={150} width={150} />
        </Flex>
      </Flex>
      <Heading as="h2" variant="subheader" sx={{ textAlign: "center" }}>
        {frontmatter.description}
      </Heading>
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
                  <Link href={full_slug}>{frontmatter.title}</Link>
                </Box>
              )
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
