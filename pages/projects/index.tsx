import { ProjectCard, SEO } from "@components/index";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { GetStaticProps } from "next";
import { Container, Grid, Heading } from "theme-ui";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "projects";
    const page_slug = "landing-projects";
    const params: Params = {
      version: "draft",
    };

    if (context.preview) {
      params.version = "draft";
      params.cv = Date.now();
    }

    const { data: projects } = await Storyblok.get(
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
        stories: projects ? projects.stories : false,
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

export default function ProjectsPage(props: StoriesPage): JSX.Element {
  const stories = useStoryblok(props.stories);
  const page = useStoryblok(props.page);
  const { meta } = props.page.content;

  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
        {page.content.title}
      </Heading>
      <Heading
        as="h2"
        variant="subheader"
        mt={[2, 3]}
        sx={{ textAlign: "center" }}
      >
        {page.content.description}
      </Heading>
      <Grid mt={4} sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {stories &&
          stories.map((data) => {
            return <ProjectCard key={data.id} data={data} />;
          })}
      </Grid>
    </Container>
  );
}
