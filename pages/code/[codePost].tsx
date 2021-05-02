import { Container, Text, Box, Badge, Divider } from "theme-ui";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";
import { format } from "date-fns";
import { calculateReadTime } from "@utils/calculateReadTime";
import { Heading, Subheading } from "@components/index";
import { render } from "storyblok-rich-text-react-renderer";
import { resolvers } from "@utils/StoryblokResolvers";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const slug = context.query.codePost;
    const apiURL = `${origin}/api/code/${slug}`;
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

export default function CodePostPage({ data }): JSX.Element {
  return (
    <Container p={[2, 3]} sx={{ width: "100%" }}>
      <Heading isCenter={false}>{data.name}</Heading>

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
      <Subheading>{data.content.title}</Subheading>
      <Box pb={[3, 4]}>{render(data.content.long_text, resolvers)}</Box>
    </Container>
  );
}
