import { AuthorInfo, DateReadTime, PostTags, SEO } from "@components/index";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { resolvers } from "@utils/StoryblokResolvers";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { render } from "storyblok-rich-text-react-renderer";
import { Box, Button, Container, Divider, Flex, Heading } from "theme-ui";

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

    const { data } = await Storyblok.get(`cdn/stories/code/${slug}`, params);
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

export default function CodePostPage(props) {
  const router = useRouter();
  const story = useStoryblok(props.story);
  const { meta } = story.content;
  return (
    <Container p={[2, 3]} sx={{ width: "100%" }}>
      <SEO meta={meta} />
      <Flex sx={{ flexFlow: "column nowrap" }}>
        <Button variant="back" onClick={() => router.back()}>
          <span>Code</span>
        </Button>
        <Heading as="h1" variant="main">
          {story.name}
        </Heading>
      </Flex>
      <DateReadTime
        date={story.first_published_at}
        text={story.content.long_text.content}
      />
      <PostTags tags={story.tag_list} />
      <Divider />
      <Heading
        my={[2, 3]}
        as="h2"
        variant="subheader"
        sx={{ textAlign: "center" }}
      >
        {story.content.title}
      </Heading>
      <Box pb={[3, 4]}>{render(story.content.long_text, resolvers)}</Box>
      {story.content.author.length >= 1 &&
        story.content.author.map((content) => (
          <AuthorInfo key={content._uid} content={content} />
        ))}
    </Container>
  );
}
