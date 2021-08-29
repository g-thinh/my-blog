import { Container, Grid, Heading } from "theme-ui";
import { getAllPosts, POSTS_PATH } from "@utils/mdxUtils";
import { Posts } from "@ts/Posts";
import { BlogPostCard } from "@components/BlogPostCard";
import { SEO } from "@components/SEO";
import type { FrontmatterProperties } from "@ts/Posts";

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

export default function PostsPage({ posts }: Posts) {
  const SEOTags: FrontmatterProperties = {
    title: "Gia Thinh Nguyen - Posts",
    description:
      "Where I share some of my findings about building apps for the web.",
    backgroundImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=659&q=80",
  };
  return (
    <Container p={[2, 3]}>
      <SEO meta={SEOTags} />
      <Heading as="h1" variant="main">
        Blog Posts
      </Heading>
      <Heading as="h2" variant="subheader" mt={[2, 3]}>
        Where I share some of my findings about building apps for the web.
      </Heading>
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
