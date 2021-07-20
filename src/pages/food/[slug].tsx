import { DateReadTime, PostTags, SEO } from "@components/index";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { resolvers } from "@utils/StoryblokResolvers";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { render } from "storyblok-rich-text-react-renderer";
import {
  AspectImage,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
} from "theme-ui";

type Params = {
  version: string;
  cv?: number;
};

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
  } catch (error) {
    return {
      notFound: true,
    };
  }
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

export default function FoodPostPage(props) {
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
        <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
          {story.content.title}
        </Heading>
      </Flex>
      <Flex my={2} sx={{ justifyContent: "center", flexFlow: "row wrap" }}>
        <PostTags tags={story.tag_list} />
      </Flex>
      <Box sx={{ textAlign: "center" }}>
        <DateReadTime
          date={story.content.date}
          text={story.content.long_text.content}
        />
      </Box>

      <Divider />
      <Box mb={[3, 4]}>
        <AspectImage
          ratio={1 / 1}
          sx={{ borderRadius: "md", objectFit: "cover" }}
          src={story.content.image.filename}
          alt={story.content.image.alt}
        />
      </Box>
      <Box pb={[3, 4]}>{render(story.content.long_text, resolvers)}</Box>
    </Container>
  );
}
