import { Container, Grid } from "theme-ui";
import { GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { Heading, Subheading, BlogPostCard } from "@components/index";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "blog";
    const params: Params = {
      version: "draft",
    };

    if (context.preview) {
      params.version = "draft";
      params.cv = Date.now();
    }

    const { data } = await Storyblok.get(
      `cdn/stories?starts_with=${slug}`,
      params
    );

    return {
      props: {
        stories: data ? data.stories : false,
        preview: context.preview || false,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default function BlogPage(props: StoriesPage): JSX.Element {
  const stories = useStoryblok(props.stories);
  return (
    <Container p={[2, 3]}>
      <Heading>Blog Posts</Heading>
      <Subheading>
        Some of the discoveries I've made working as a front-end dev lately.
      </Subheading>
      <Grid sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {stories.map((post) => {
          return <BlogPostCard key={post.id} data={post} />;
        })}
      </Grid>
    </Container>
  );
}
