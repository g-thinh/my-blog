import { Container, Grid } from "theme-ui";
import { GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { FoodCard, Heading, Subheading } from "@components/index";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "food";
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

export default function AboutPage(props: StoriesPage): JSX.Element {
  const stories = useStoryblok(props.stories);
  return (
    <Container p={[2, 3]}>
      <Heading>Food stuff 🤤</Heading>
      <Subheading>
        Here are some of the recipes I've been cooking up lately that were worth
        sharing.
      </Subheading>
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
