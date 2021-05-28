import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Container, Box, Text, Divider, Spinner, Flex } from "theme-ui";
import { format } from "date-fns";

function useFeatured() {
  const { data: posts, error } = useSWR("/api/featured", (url) =>
    fetch(url).then((res) => res.json())
  );
  return {
    posts,
    isLoading: !posts && !error,
  };
}

export default function NewsList() {
  const { posts, isLoading } = useFeatured();
  const router = useRouter();

  return (
    <Container
      p={3}
      bg="muted"
      sx={{
        display: router.route === "/" ? "block" : "none",
        borderRadius: "card",
      }}
    >
      <Text
        py={[2, 3]}
        sx={{
          fontSize: [3, 4],
          textAlign: "left",
          width: "100%",
        }}
      >
        Latest Posts
      </Text>
      <Divider />
      {!isLoading ? (
        posts.map((post, index) => {
          return (
            <Box key={index}>
              <Link href={post.full_slug} passHref>
                <Text
                  as="a"
                  color="text"
                  sx={{
                    fontSize: [2, 3],
                    textDecoration: "none",
                    "&:hover": { color: "primary" },
                  }}
                >
                  •{"  "}
                  {post.name}{" "}
                  <Text as="span" color="grayness" sx={{ fontSize: [2, 3] }}>
                    - {format(new Date(post.first_published_at), "MMM d")}
                  </Text>
                </Text>
              </Link>
            </Box>
          );
        })
      ) : (
        <Flex py={2} sx={{ justifyContent: "center" }}>
          <Spinner />
        </Flex>
      )}
    </Container>
  );
}
