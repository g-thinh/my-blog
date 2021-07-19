import { Container, Box, Flex, Paragraph, Heading } from "theme-ui";
import { FeaturedList, SEO } from "@components/index";
import { GetStaticProps } from "next";
import { useColorMode } from "theme-ui";
import Storyblok, { useStoryblok } from "@utils/storyblok";

import reactDark from "public/reactDark.json";
import reactLight from "public/reactLight.json";
import Lottie from "react-lottie";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = "landing";
    const params: Params = {
      version: "draft",
    };

    if (context.preview) {
      params.version = "draft";
      params.cv = Date.now();
    }

    const { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

    return {
      props: {
        story: data ? data.story : false,
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

export default function HomePage(props: StoryPage): JSX.Element {
  const story = useStoryblok(props.story);
  const { meta } = story.content;
  const [colorMode] = useColorMode();
  const isDark = colorMode === "dark";

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: isDark ? reactDark : reactLight,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container p={[2, 3]}>
      <SEO meta={meta} />
      <Flex
        sx={{
          flexFlow: "column",
          justifyContent: "center",
        }}
      >
        <Heading as="h1" variant="main" sx={{ textAlign: "center" }}>
          {story.content.title}
        </Heading>
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie options={defaultOptions} height={150} width={150} />
        </Flex>
      </Flex>
      <Heading as="h2" variant="subheader" sx={{ textAlign: "center" }}>
        {story.content.subtitle}
      </Heading>
      <Box p={3}>
        <Paragraph>{story.content.description}</Paragraph>
      </Box>
      <FeaturedList />
    </Container>
  );
}
