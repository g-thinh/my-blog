import { Container, Grid } from "theme-ui";
import { GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { Heading, Subheading, BlogPostCard, SEO } from "@components/index";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "blog";
    const page_slug = "landing-blog";
    const params: Params = {
      version: "draft",
    };

    if (context.preview) {
      params.version = "draft";
      params.cv = Date.now();
    }

    const { data: post } = await Storyblok.get(
      `cdn/stories?starts_with=${slug}`,
      params
    );

    const { data: page } = await Storyblok.get(
      `cdn/stories/${page_slug}`,
      params
    );
    console.log(page);

    return {
      props: {
        page: page ? page.story : false,
        stories: post ? post.stories : false,
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
  const page = useStoryblok(props.page);
  const { meta } = props.page.content;
  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Heading>{page.content.title}</Heading>
      <Subheading>{page.content.description}</Subheading>
      <Grid sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {stories.map((post) => {
          return <BlogPostCard key={post.id} data={post} />;
        })}
      </Grid>
    </Container>
  );
}
