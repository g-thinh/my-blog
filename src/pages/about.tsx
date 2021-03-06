import { SEO } from "@components/SEO";
import { MDXComponent } from "@components/MDXComponent";
import { getSinglePost, LANDING_PATH } from "@utils/mdxUtils";
import { Box, Container, Heading, Paragraph } from "theme-ui";
import { SinglePost } from "@ts/Posts";

export async function getStaticProps() {
  const { markdownContent, frontmatter } = await getSinglePost(
    "about",
    LANDING_PATH
  );
  return {
    props: { markdownContent, frontmatter },
  };
}

export default function AboutPage({
  markdownContent,
  frontmatter,
}: SinglePost) {
  const SEOTag = {
    title: `Gia Thinh Nguyen - ${frontmatter.title}`,
    description: frontmatter.description,
    backgroundImage: frontmatter.backgroundImage,
  };

  return (
    <Container p={[2, 3]}>
      <SEO meta={SEOTag} />
      <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
        {frontmatter.title}
      </Heading>
      <Paragraph variant="subheader" mt={[2, 3]} sx={{ textAlign: "center" }}>
        {frontmatter.description}
      </Paragraph>

      <Box as="section" mt={[3, 4]} p={[3, 0]}>
        <MDXComponent code={markdownContent} />
      </Box>
    </Container>
  );
}
