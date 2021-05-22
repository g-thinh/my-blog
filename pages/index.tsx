import { Container, Box, Text, Flex } from "theme-ui";
import { MainHeading, Subheading, FeaturedList, SEO } from "@components/index";
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
        <MainHeading>{story.content.title}</MainHeading>
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie options={defaultOptions} height={150} width={150} />
        </Flex>
      </Flex>
      <Subheading>{story.content.subtitle}</Subheading>
      <Box p={3} sx={{ borderRadius: "card" }}>
        <Text as="p" my={3}>
          {story.content.description}
        </Text>
        <Text as="p" my={3}>
          {story.content.header_tags}
        </Text>
        {story.content.tags &&
          story.content.tags.map((tag: any) => {
            return (
              <Text
                as="span"
                key={tag}
                px={1}
                sx={{
                  filter: "brightness(57%)",
                  userSelect: "none",
                  "&::before": {
                    content: '"#"',
                  },

                  "&:hover": {
                    cursor: "pointer",
                    transition: "all 0.3s",
                    color: "primary",
                  },
                }}
              >
                {tag}
              </Text>
            );
          })}
      </Box>
      <FeaturedList />
    </Container>
  );
}
