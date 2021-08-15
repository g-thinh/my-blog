import { Container, Grid, Heading } from "theme-ui";
import { getAllPosts, POSTS_PATH } from "@utils/mdxUtils";
import { Posts } from "@ts/Posts";
import { BlogPostCard } from "@components/index";

export async function getStaticProps() {
  const posts = await getAllPosts(POSTS_PATH);

  //sorts posts by latest
  posts.sort((postA, postB) => {
    const DateA = new Date(postA.frontmatter.published).getTime();
    const DateB = new Date(postB.frontmatter.published).getTime();
    return DateB - DateA;
  });

  return {
    props: { posts },
  };
}

export default function CodePage({ posts }: Posts) {
  return (
    <Container p={[2, 3]}>
      <Heading>This is where all my posts go</Heading>
      <Grid mt={4} sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {posts &&
          posts.map(({ frontmatter, full_slug }, index) => {
            return !frontmatter.isDraft ? (
              <BlogPostCard
                key={index}
                full_slug={full_slug}
                frontmatter={frontmatter}
              />
            ) : null;
          })}
      </Grid>
    </Container>
  );
}
