import {
  Container,
  Text,
  Box,
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
import { MainHeading, SEO, PostTags } from "@components/index";
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

export default function FoodPostPage(props: StoryPage): JSX.Element {
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
        <MainHeading>{story.content.title}</MainHeading>
      </Flex>
      <Flex my={2} sx={{ justifyContent: "center", flexFlow: "row wrap" }}>
        <PostTags tags={story.tag_list} />
      </Flex>
      <Text as="h2" color="grey" sx={{ textAlign: "center" }}>
        {format(new Date(story.content.date), "MMM d, yyyy")} •{"  "}
        {calculateReadTime(story.content.long_text.content)}
      </Text>
      <PostTags tags={story.tag_list} />
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
