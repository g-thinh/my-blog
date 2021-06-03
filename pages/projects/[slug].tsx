import { Container, Box, Flex, Button, Divider, AspectImage } from "theme-ui";
import { GetStaticPaths, GetStaticProps } from "next";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { useRouter } from "next/router";
import { MainHeading, SEO, PostTags, DateReadTime } from "@components/index";
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

    const { data } = await Storyblok.get(
      `cdn/stories/projects/${slug}`,
      params
    );

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
    starts_with: "projects",
  });

  const paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    const slug = data.links[linkKey].slug.replace("projects", "");
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
      {/* <SEO meta={meta} /> */}
      <Flex sx={{ flexFlow: "column nowrap", alignItems: "center" }}>
        <Button variant="back" onClick={() => router.back()}>
          <span>Projects</span>
        </Button>
        <MainHeading>{story.content.title}</MainHeading>
      </Flex>
      {/* <Flex my={2} sx={{ justifyContent: "center", flexFlow: "row wrap" }}>
        <PostTags tags={story.tag_list} />
      </Flex> */}
      {/* <Box sx={{ textAlign: "center" }}>
        <DateReadTime
          date={story.content.date}
          text={story.content.long_text.content}
        />
      </Box> */}

      <Divider />
      <Box mb={[3, 4]}>
        <AspectImage
          ratio={1 / 1}
          sx={{ borderRadius: "0.5rem", objectFit: "cover" }}
          src={story.content.image.filename}
          alt={story.content.image.alt}
        />
      </Box>
      {/* <Box pb={[3, 4]}>{render(story.content.long_text, resolvers)}</Box> */}
    </Container>
  );
}
