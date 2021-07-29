import { AuthorInfo, DateReadTime, PostTags, SEO } from "@components/index";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { renderRichText } from "@utils/StoryblokResolvers";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Paragraph,
} from "theme-ui";
import NextImage from "next/image";

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

    const { data } = await Storyblok.get(`cdn/stories/blog/${slug}`, params);

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
export default function BlogPostPage(props) {
  const router = useRouter();
  const story = useStoryblok(props.story);
  const { meta } = story.content;
  return (
    <Container p={[2, 3]} sx={{ scrollMarginTop: "20em" }}>
      <SEO meta={meta} />
      <Box mb={[3, 4]}>
        <Flex sx={{ flexFlow: "column nowrap" }}>
          <Button variant="back" onClick={() => router.back()}>
            <span>Blog</span>
          </Button>
          <Heading as="h1" variant="main">
            {story.content.title}
          </Heading>
        </Flex>
        <DateReadTime
          date={story.first_published_at}
          text={story.content.long_text.content}
        />
        <PostTags tags={story.tag_list} />
        <Flex my={2}>
          <Paragraph>{story.content.intro}</Paragraph>
        </Flex>

        <Divider />
      </Box>
      <AspectRatio ratio={4 / 3} sx={{ img: { borderRadius: "md" } }}>
        <NextImage
          src={story.content.image.filename}
          alt={story.content.image.alt}
          layout="fill"
          objectFit="cover"
          priority
        />
      </AspectRatio>
      <Box pb={[3, 4]}>{renderRichText(story.content.long_text)}</Box>
      {story.content.author.length >= 1 &&
        story.content.author.map((content) => (
          <AuthorInfo key={content._uid} content={content} />
        ))}
    </Container>
  );
}
