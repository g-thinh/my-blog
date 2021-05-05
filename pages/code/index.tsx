import { Container, Grid, Text, Card, Divider, Flex } from "theme-ui";
import { Heading, Subheading } from "@components/index";
import Storyblok, { useStoryblok } from "@utils/storyblok";
import { GetStaticProps } from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "code";
    const params: Params = {
      version: "draft",
    };

    if (context.preview) {
      params.version = "draft";
      params.cv = Date.now();
    }

    const { data } = await Storyblok.get(
      `cdn/stories?starts_with=${slug}`,
      params
    );

    return {
      props: {
        stories: data ? data.stories : false,
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

export default function CodePage(props: StoriesPage): JSX.Element {
  const stories = useStoryblok(props.stories);
  return (
    <Container p={[2, 3]}>
      <Heading>Code Corner 💻</Heading>
      <Subheading>
        Pretty much here where I'll highlight some projects I've worked on, or
        neat snippets of code that helped me solve funky coding scenarios.
      </Subheading>

      <Grid sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {stories &&
          stories.map((post) => {
            return (
              <Card key={post.id}>
                <Divider />
                <Flex py={3} sx={{ flexFlow: ["column nowrap", "row nowrap"] }}>
                  <Flex
                    sx={{
                      flexFlow: ["column nowrap"],
                      justifyContent: "center",
                    }}
                  >
                    <Text as="h3" color="secondary" mb={2} sx={{ fontSize: 3 }}>
                      {post.name}
                    </Text>
                    <Text as="p" py={1} pr={5}>
                      {post.content.preview}
                    </Text>
                    <Link href={post.full_slug} passHref>
                      <Text
                        as="a"
                        color="grey"
                        my={2}
                        sx={{
                          width: "fit-content",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Show Me⏵
                      </Text>
                    </Link>
                  </Flex>
                </Flex>
                <Divider />
              </Card>
            );
          })}
      </Grid>
    </Container>
  );
}
