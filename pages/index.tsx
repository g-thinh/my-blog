import { Container, Box, Text, Paragraph, Flex } from "theme-ui";
import { Heading, Subheading } from "@components/index";
import { GetServerSideProps } from "next";
import { useColorMode } from "theme-ui";
import absoluteUrl from "next-absolute-url";

import reactDark from "public/reactDark.json";
import reactLight from "public/reactLight.json";
import Lottie from "react-lottie";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const apiURL = `${origin}/api/`;
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

export default function HomePage({ data }: any): JSX.Element {
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
      <Flex
        sx={{
          flexFlow: "column",
          justifyContent: "center",
        }}
      >
        <Heading>{data.content.title}</Heading>
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie options={defaultOptions} height={150} width={150} />
        </Flex>
      </Flex>
      <Subheading>{data.content.subtitle}</Subheading>
      <Box p={2} sx={{ borderRadius: "card" }}>
        <Paragraph as="p" variant="block" my={3}>
          {data.content.description}
        </Paragraph>
        <Paragraph as="p" variant="block" my={3}>
          {data.content.header_tags}
        </Paragraph>
        {data.content.tags.map((tag: any) => {
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
    </Container>
  );
}
