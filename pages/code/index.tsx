import { Container, Grid, Text, Card, Divider, Flex } from "theme-ui";
import { Heading, Subheading } from "@components/index";
import { GetServerSideProps } from "next";
import Link from "next/link";
import absoluteUrl from "next-absolute-url";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const apiURL = `${origin}/api/code`;
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

export default function CodePage({ data }: any): JSX.Element {
  return (
    <Container p={[2, 3]}>
      <Heading>Code Corner 💻</Heading>
      <Subheading>
        Pretty much here where I'll highlight some projects I've worked on, or
        neat snippets of code that helped me solve funky coding scenarios.
      </Subheading>

      <Grid sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {data.map((post) => {
          return (
            <Card>
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
