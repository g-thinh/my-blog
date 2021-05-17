import {
  Container,
  Text,
  Box,
  Badge,
  Flex,
  Button,
  Divider,
  AspectImage,
} from "theme-ui";
import { GetStaticPaths, GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { calculateReadTime } from "@utils/calculateReadTime";
import { Heading, SEO } from "@components/index";
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
  const router = useRouter();
  const story = useStoryblok(props.story);
  const { meta } = story.content;
  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Flex sx={{ flexFlow: "column nowrap", alignItems: "center" }}>
        <Button variant="back" onClick={() => router.back()}>
          <span>Food</span>
        </Button>
        <Heading>{story.content.title}</Heading>
      </Flex>
      <Flex my={2} sx={{ justifyContent: "center", flexFlow: "row wrap" }}>
        {story.tag_list &&
          story.tag_list.map((tag) => (
            <Badge
              key={tag}
              mr={story.tag_list.length > 1 ? 3 : 0}
              px={2}
              sx={{
                backgroundColor: "primary",
                color: "grayness",
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
        <AspectImage
          ratio={1 / 1}
          sx={{ borderRadius: "0.5rem" }}
          src={story.content.image.filename}
          alt={story.content.image.alt}
        />
      </Box>
      <Box pb={[3, 4]}>{render(story.content.long_text, resolvers)}</Box>
    </Container>
  );
}
