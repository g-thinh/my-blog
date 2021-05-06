import { useState, useEffect } from "react";
import Storyblok from "@utils/storyblok";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Box, Text, Divider, Spinner } from "theme-ui";

export default function NewsList(): JSX.Element {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  async function fetchPosts() {
    const { data } = await Storyblok.get("cdn/links");
    const paths = [];
    Object.keys(data.links).forEach((linkKey) => {
      if (
        data.links[linkKey].is_folder ||
        data.links[linkKey].slug === "about" ||
        data.links[linkKey].slug === "landing"
      ) {
        return;
      }
      paths.push({
        slug: data.links[linkKey].real_path,
        name: data.links[linkKey].name,
      });
    });
    const top5 = paths.slice(0, 4);

    setPosts(top5);
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
              <Link href={post.slug} passHref>
                <Text
                  as="a"
                  color="text"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { color: "primary" },
                  }}
                >
                  •{"  "}
                  {post.name}
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
