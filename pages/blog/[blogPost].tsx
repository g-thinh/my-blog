import { Container, Text, Box, Badge } from "theme-ui";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";
import Image from "next/image";
import { format } from "date-fns";
import { calculateReadTime } from "@utils/calculateReadTime";
import { Heading } from "@components/index";
import { render } from "storyblok-rich-text-react-renderer";
import { resolvers } from "@utils/StoryblokResolvers";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const slug = context.query.blogPost;
    const apiURL = `${origin}/api/blog/${slug}`;
    const res = await fetch(apiURL);
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.log("Error", error);
    return {
      notFound: true,
      redirect: {
        destination: "/404",
        permanent: false,
      },
      props: {},
    };
  }
};

export default function BlogPostPage({ data }): JSX.Element {
  return (
    <Container p={[2, 3]}>
      <Box mb={[3, 4]}>
        <Heading isCenter={false}>{data.name}</Heading>
        <Text>{data.content.intro}</Text>
        <Text as="h2" color="grey" sx={{ textAlign: "left" }}>
          {format(new Date(data.first_published_at), "MMM d")} •{"  "}
          {calculateReadTime(data.content.long_text.content)}
        </Text>
        {data.content.tags &&
          data.content.tags.map((tag) => (
            <Badge
              key={tag}
              mr={3}
              px={2}
              sx={{ backgroundColor: "primary", color: "text" }}
            >
              {tag}
            </Badge>
          ))}
      </Box>

      <Box mb={[3, 4]}>
        <Image
          src={data.content.image.filename}
          alt={data.content.image.alt}
          width="48em"
          height="25em"
          layout="responsive"
        />
      </Box>
      <Box pb={[3, 4]}>{render(data.content.long_text, resolvers)}</Box>
    </Container>
  );
}
