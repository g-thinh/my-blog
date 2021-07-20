import { Container, Grid, Heading } from "theme-ui";
import { GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { BlogPostCard, SEO } from "@components/index";

type Params = {
  version: string;
  cv?: number;
};

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

    const { data: posts } = await Storyblok.get(
      `cdn/stories?starts_with=${slug}`,
      params
    );

    const { data: page } = await Storyblok.get(
      `cdn/stories/${page_slug}`,
      params
    );

    return {
      props: {
        page: page ? page.story : false,
        stories: posts ? posts.stories : false,
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
export default function BlogPage(props) {
  const stories = useStoryblok(props.stories);
  const page = useStoryblok(props.page);
  const { meta } = props.page.content;
  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
        {page.content.title}
      </Heading>
      <Heading as="h2" variant="subheader" mt={[2, 3]}>
        {page.content.description}
      </Heading>
      <Grid mt={4} sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {stories.map((post) => {
          return <BlogPostCard key={post.id} data={post} />;
        })}
      </Grid>
    </Container>
  );
}
