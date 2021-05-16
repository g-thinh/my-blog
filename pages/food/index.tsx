import { Container, Grid } from "theme-ui";
import { GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { FoodCard, Heading, Subheading, SEO } from "@components/index";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "food";
    const page_slug = "landing-food";
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

export default function AboutPage(props: StoriesPage): JSX.Element {
  const stories = useStoryblok(props.stories);
  const page = useStoryblok(props.page);
  const { meta } = props.page.content;
  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Heading>{page.content.title}</Heading>
      <Subheading>{page.content.description}</Subheading>
      <Grid
        sx={{ gridTemplateColumns: ["1fr", "1fr 1fr"], gridAutoRows: "1fr" }}
      >
        {stories.map((post) => {
          return <FoodCard key={post.id} data={post} />;
        })}
      </Grid>
    </Container>
  );
}
