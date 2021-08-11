import { Container, Heading, Text, Box, Flex, Button } from "theme-ui";
import { getSinglePost, getAllPosts, POSTS_PATH } from "@utils/mdxUtils";
import { MDXComponent, PostTags, SEO } from "@components/index";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { SinglePost } from "@ts/Posts";

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

export const DateReadTime = (props: Props): JSX.Element => {
  return (
    <Text
      as="h2"
      color="grayness"
      sx={{ fontSize: [3, 4], fontFamily: "body" }}
    >
      {format(new Date(props.date), "MMM d, yyyy")} •{"  "}
      {calculateReadTime(props.text)}
    </Text>
  );
};

export default function PostPage({ markdownContent, frontmatter }: SinglePost) {
  const router = useRouter();
  return (
    <Container p={[2, 3]}>
      <SEO meta={frontmatter} />
      <Box mb={[3, 4]}>
        <Flex sx={{ flexFlow: "column nowrap" }}>
          <Button variant="back" onClick={() => router.back()}>
            <span>Blog</span>
          </Button>
          <Heading as="h1" variant="main">
            {frontmatter.title}
          </Heading>
        </Flex>
        <DateReadTime date={frontmatter.published} text={markdownContent} />
        <PostTags tags={frontmatter.tags} />
      </Box>
      <MDXComponent code={markdownContent} />
    </Container>
  );
}
