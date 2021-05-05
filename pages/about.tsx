import { Container, Box } from "theme-ui";
import { Heading, Subheading } from "@components/index";
import { GetStaticProps } from "next";
import { render } from "storyblok-rich-text-react-renderer";
import { resolvers } from "@utils/StoryblokResolvers";
import Storyblok, { useStoryblok } from "@utils/storyblok";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "about";
    const params: Params = {
      version: "published",
    };

    if (context.preview) {
      params.version = "published";
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

export default function AboutPage(props: StoryPage): JSX.Element {
  const story = useStoryblok(props.story);
  return (
    <Container
      my="auto"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Heading>{story.content.title}</Heading>
      <Subheading>{story.content.subtitle}</Subheading>

      <Box as="section" mt={[3, 4]} p={[3, 0]}>
        {render(story.content.description, resolvers)}
      </Box>
    </Container>
  );
}
