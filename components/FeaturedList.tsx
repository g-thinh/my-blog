import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Container, Box, Text, Divider, Spinner } from "theme-ui";
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

export default function NewsList(): JSX.Element {
  const { posts, isLoading } = useFeatured();
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

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
          fontSize: 4,
          textAlign: "left",
          width: "100%",
        }}
      >
        Latest Posts
      </Text>
      <Divider />
      {posts.map((post, index) => {
        return (
          <Box key={index}>
            <Link href={post.full_slug} passHref>
              <Text
                as="a"
                color="text"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: "primary" },
                }}
              >
                •{"  "}
                {post.name}{" "}
                <Text as="span" color="grey">
                  - {format(new Date(post.published_at), "MMM d")}
                </Text>
              </Text>
            </Link>
          </Box>
        );
      })}
    </Container>
  );
}
