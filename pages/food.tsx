import { Container, Text, Box, Card, Flex } from "theme-ui";
import Link from "next/link";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Image from "next/image";
import absoluteUrl from "next-absolute-url";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const apiURL = `${origin}/api/food`;
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
      {data.map((post) => {
        return (
          <Link href={post.full_slug}>
            <Card
              bg="muted"
              sx={{
                borderRadius: "card",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "card",
                  "& h2": {
                    color: "primary",
                  },
                },
              }}
              p={3}
              mb={[3, 4]}
            >
              <Flex>
                <Flex sx={{ width: "100%", flex: "1" }}>
                  <StyledImage
                    src={post.content.image.filename}
                    alt={post.content.image.alt}
                    width={120}
                    height={120}
                  />
                </Flex>
                <Flex
                  px={[3, 4]}
                  sx={{
                    flex: "3",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    as="h2"
                    color="text"
                    sx={{
                      fontSize: [2, 3],
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {post.content.title}
                  </Text>
                  <Text
                    as="p"
                    color="text"
                    my={[1, 3]}
                    sx={{ textAlign: "center", fontSize: [1] }}
                  >
                    {post.content.description}
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
}

const StyledImage = styled(Image)({
  borderRadius: "1.5rem",
});
