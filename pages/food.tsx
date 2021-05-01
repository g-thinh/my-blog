import { Container, Text, Box, Card, Flex } from "theme-ui";
import Link from "next/link";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Image from "next/image";
import absoluteUrl from "next-absolute-url";
import { format } from "date-fns";

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
      <Text
        as="h1"
        color="text"
        my={[2, 3]}
        sx={{
          fontSize: [4, 5],
          textAlign: ["center", "left"],
          fontWeight: "bold",
        }}
      >
        Food stuff 🤤
      </Text>
      <Text
        as="p"
        color="text"
        mb={[4, 5]}
        sx={{ textAlign: ["center", "left"], fontSize: [3] }}
      >
        Here are some of the recipes I've been cooking up lately that were worth
        sharing.
      </Text>
      {data.map((post) => {
        return (
          <Link href={post.full_slug}>
            <Card
              bg="muted"
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                borderRadius: "card",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "card",
                  "& h2": {
                    color: "primary",
                  },
                },
              }}
              p={[2, 3]}
              mb={[3, 4]}
            >
              <Flex sx={{ width: "100%" }}>
                <Box
                  sx={{
                    width: "100%",
                    flex: ["none", 1],
                    display: ["none", "flex"],
                  }}
                >
                  <StyledImage
                    src={post.content.image.filename}
                    alt={post.content.image.alt}
                    width={120}
                    height={120}
                  />
                </Box>
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
                  <Text as="h3">
                    {format(new Date(post.content.date), "do MMMM, yyyy")}
                  </Text>
                  <Text
                    as="p"
                    color="text"
                    my={[1, 3]}
                    sx={{
                      textAlign: "center",
                      fontSize: [1],
                      flexGrow: 1,
                      display: "flex",
                    }}
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
