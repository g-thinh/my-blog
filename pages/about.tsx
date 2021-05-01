import { Container, Text, Box } from "theme-ui";
import { GetServerSideProps } from "next";
import { render } from "storyblok-rich-text-react-renderer";
import { resolvers } from "@utils/StoryblokResolvers";
import absoluteUrl from "next-absolute-url";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const apiURL = `${origin}/api/about`;
    const res = await fetch(apiURL);
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.log("Error", error);
    return { props: {} };
  }
};

export default function AboutPage({ data }: any) {
  return (
    <Container
      my="auto"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Text
        as="h1"
        color="text"
        sx={{
          fontSize: [3, 4, 5],
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {data.content.title}
      </Text>
      <Text
        as="p"
        color="text"
        my={[1, 3]}
        sx={{ textAlign: "center", fontSize: [3] }}
      >
        {data.content.subtitle}
      </Text>

      <Box as="section" mt={[3, 4]}>
        {render(data.content.description, resolvers)}
      </Box>
    </Container>
  );
}
