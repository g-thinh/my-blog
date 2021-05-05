import { Container, Text, Box, Flex, Badge, Divider, Button } from "theme-ui";
import { GetStaticPaths, GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { format } from "date-fns";
import { calculateReadTime } from "@utils/calculateReadTime";
import { Heading, Subheading } from "@components/index";
import { render } from "storyblok-rich-text-react-renderer";
import { resolvers } from "@utils/StoryblokResolvers";

import { useRouter } from "next/router";

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

    const { data } = await Storyblok.get(`cdn/stories/code/${slug}`, params);

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
    starts_with: "code",
  });

  const paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    const slug = data.links[linkKey].slug.replace("code", "");
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
  return (
    <Container p={[2, 3]} sx={{ width: "100%" }}>
      <Flex sx={{ flexFlow: "column nowrap" }}>
        <Button variant="back" onClick={() => router.back()}>
          <span>Code</span>
        </Button>
        <Heading isCenter={false}>{story.name}</Heading>
      </Flex>

      <Text as="h2" color="grey" sx={{ textAlign: "left" }}>
        {format(new Date(story.first_published_at), "MMM d")} •{"  "}
        {calculateReadTime(story.content.long_text.content)}
      </Text>
      {story.content.tags &&
        story.content.tags.map((tag) => (
          <Badge
            key={tag}
            mr={story.content.tags.length > 1 ? 3 : 0}
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
      <Divider />
      <Subheading>{story.content.title}</Subheading>
      <Box pb={[3, 4]}>{render(story.content.long_text, resolvers)}</Box>
    </Container>
  );
}
