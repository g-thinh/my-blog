import {
  Container,
  Text,
  Box,
  Badge,
  Flex,
  Button,
  AspectImage,
} from "theme-ui";
import { GetStaticPaths, GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { useRouter } from "next/router";
import { format } from "date-fns";
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

    const { data } = await Storyblok.get(`cdn/stories/blog/${slug}`, params);

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
  const { data } = await Storyblok.get("cdn/links/", {
    starts_with: "blog",
  });
  const paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }
    const slug = data.links[linkKey].slug.replace("blog", "");
    paths.push({ params: { slug } });
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};
export default function BlogPostPage(props: StoryPage): JSX.Element {
  const router = useRouter();
  const story = useStoryblok(props.story);
  const { meta } = story.content;
  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Box mb={[3, 4]}>
        <Flex sx={{ flexFlow: "column nowrap" }}>
          <Button variant="back" onClick={() => router.back()}>
            <span>Blog</span>
          </Button>
          <Heading isCenter={false}>{story.content.title}</Heading>
        </Flex>

        <Text>{story.content.intro}</Text>
        <Text as="h2" color="grey" sx={{ textAlign: "left" }}>
          {format(new Date(story.first_published_at), "MMM d")} •{"  "}
          {calculateReadTime(story.content.long_text.content)}
        </Text>
        {story.tag_list &&
          story.tag_list.map((tag) => (
            <Badge
              key={tag}
              mr={story.content.tags.length > 1 ? 3 : 0}
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
      </Box>

      <AspectImage
        ratio={4 / 3}
        sx={{ borderRadius: "0.5rem", objectFit: "cover" }}
        src={story.content.image.filename}
        alt={story.content.image.alt}
      />
      <Box pb={[3, 4]}>{render(story.content.long_text, resolvers)}</Box>
    </Container>
  );
}
