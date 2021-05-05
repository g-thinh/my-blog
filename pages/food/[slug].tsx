import { Container, Text, Box, Badge, Flex, Divider } from "theme-ui";
import { GetStaticPaths, GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { format } from "date-fns";
import Image from "next/image";
import { calculateReadTime } from "@utils/calculateReadTime";
import { Heading } from "@components/index";
import { render } from "storyblok-rich-text-react-renderer";
import { resolvers } from "@utils/StoryblokResolvers";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { slug } = context.params;
    const params: Params = {
      version: "draft",
    };

    if (context.preview) {
      params.version = "draft";
      params.cv = Date.now();
    }

    const { data } = await Storyblok.get(`cdn/stories/food/${slug}`, params);

    return {
      props: {
        story: data ? data.story : false,
        preview: context.preview || false,
      },
      revalidate: 10,
    };
  } catch (error) {}
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await Storyblok.get("cdn/links", {
    starts_with: "food",
  });

  const paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    const slug = data.links[linkKey].slug.replace("food", "");
    paths.push({ params: { slug } });
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default function CodePostPage(props: StoryPage): JSX.Element {
  const story = useStoryblok(props.story);
  return (
    <Container p={[2, 3]}>
      <Heading>{story.content.title}</Heading>
      <Flex my={2} sx={{ justifyContent: "center", flexFlow: "row wrap" }}>
        {story.content.tags &&
          story.content.tags.map((tag) => (
            <Badge
              key={tag}
              mr={3}
              px={2}
              sx={{
                backgroundColor: "primary",
                color: "text",
                borderRadius: "1rem",
              }}
            >
              {tag}
            </Badge>
          ))}
      </Flex>
      <Text as="h2" color="grey" sx={{ textAlign: "center" }}>
        {format(new Date(story.content.date), "MMM d, yyyy")} •{"  "}
        {calculateReadTime(story.content.long_text.content)}
      </Text>

      <Divider />

      <Box mb={[3, 4]}>
        <Image
          src={story.content.image.filename}
          alt={story.content.image.alt}
          width="48em"
          height="35em"
          layout="responsive"
        />
      </Box>
      <Box pb={[3, 4]}>{render(story.content.long_text, resolvers)}</Box>
    </Container>
  );
}