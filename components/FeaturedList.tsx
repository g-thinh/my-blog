import { useState, useEffect } from "react";
import Storyblok from "@utils/storyblok";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Box, Text, Divider, Spinner } from "theme-ui";
import { format } from "date-fns";

export default function NewsList(): JSX.Element {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  async function fetchPosts() {
    const { data } = await Storyblok.get("cdn/stories", {
      by_slugs: "blog/*,code/*",
      per_page: 5,
      sort_by: "published_at:desc",
    });
    if (data.stories) {
      setPosts(data.stories);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

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
      {posts.length > 0 ? (
        posts.map((post, index) => {
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
        })
      ) : (
        <Spinner />
      )}
    </Container>
  );
}
