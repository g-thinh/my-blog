import { Container, Heading, Text, Box, Divider } from "theme-ui";
import { getSinglePost, getAllPosts, POSTS_PATH } from "@utils/mdxUtils";
import { MDXComponent } from "@components/MDXComponent";
import { Tags } from "@components/Tags";
import { SEO } from "@components/SEO";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { SinglePost } from "@ts/Posts";

dayjs.extend(advancedFormat);

export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug, POSTS_PATH);
  return {
    props: { ...post },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPosts(POSTS_PATH).map(({ slug }) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export function calculateReadTime(content): string {
  const wordsPerMinute = 200;
  let resultReadTime = 0;
  const wordsLength = content.split(" ").length;
  if (wordsLength > 0) {
    const value: number = wordsLength / wordsPerMinute;
    resultReadTime += value;
  }
  const resultText = `${Math.ceil(resultReadTime)} min read`;
  return resultText;
}

interface Props {
  date: Date;
  text: any;
}

function DateReadTime(props: Props) {
  return (
    <Text
      as="h2"
      color="grayness"
      sx={{ fontSize: [3, 4], fontFamily: "body" }}
    >
      {dayjs(props.date).format("MMM Do, YYYY")} •{"  "}
      {calculateReadTime(props.text)}
    </Text>
  );
}

export default function PostPage({ markdownContent, frontmatter }: SinglePost) {
  return (
    <Container p={[2, 3]}>
      <SEO meta={frontmatter} />
      <Box mb={[3, 4]}>
        <Heading as="h1" variant="main">
          {frontmatter.title}
        </Heading>
        <DateReadTime date={frontmatter.published} text={markdownContent} />
        <Tags tags={frontmatter.tags} />
      </Box>
      <Divider mb={4} />
      <MDXComponent code={markdownContent} />
    </Container>
  );
}
