import { Container, Grid } from "theme-ui";
import { Heading, Subheading, CodePostCard } from "@components/index";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "code";
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

export default function CodePage(props: StoriesPage): JSX.Element {
  const stories = useStoryblok(props.stories);
  return (
    <Container p={[2, 3]}>
      <Heading>Code Corner 💻</Heading>
      <Subheading>
        Pretty much here where I'll highlight some projects I've worked on, or
        neat snippets of code that helped me solve funky coding scenarios.
      </Subheading>

      <Grid sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {stories &&
          stories.map((post) => {
            return <CodePostCard key={post.id} data={post} />;
          })}
      </Grid>
    </Container>
  );
}
