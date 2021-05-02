import { Container, Box, Text, Paragraph } from "theme-ui";
import { Heading, Subheading } from "@components/index";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";

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

interface Props {
  data: any;
}

export default function HomePage({ data }: Props) {
  return (
    <Container p={[2, 3]}>
      <Heading>{data.content.title}</Heading>
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
