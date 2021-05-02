import { Container, Text, Box } from "theme-ui";
import { Heading, Subheading } from "@components/index";
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
      <Heading>{data.content.title}</Heading>
      <Subheading>{data.content.subtitle}</Subheading>

      <Box as="section" mt={[3, 4]} p={[3, 0]}>
        {render(data.content.description, resolvers)}
      </Box>
    </Container>
  );
}
