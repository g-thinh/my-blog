import { SEO } from "@components/index";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { resolvers } from "@utils/StoryblokResolvers";
import { GetStaticProps } from "next";
import { render } from "storyblok-rich-text-react-renderer";
import { Box, Container, Heading } from "theme-ui";

type Params = {
  version: string;
  cv?: number;
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "about";
    const params: Params = {
      version: "draft",
    };

    if (context.preview) {
      params.version = "draft";
      params.cv = Date.now();
    }

    const { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

    return {
      props: {
        story: data ? data.story : false,
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

export default function AboutPage(props) {
  const story = useStoryblok(props.story);
  const { meta } = story.content;
  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
        {story.content.title}
      </Heading>
      <Heading
        as="h2"
        variant="subheader"
        mt={[2, 3]}
        sx={{ textAlign: "center" }}
      >
        {story.content.subtitle}
      </Heading>

      <Box as="section" mt={[3, 4]} p={[3, 0]}>
        {render(story.content.description, resolvers)}
      </Box>
    </Container>
  );
}
