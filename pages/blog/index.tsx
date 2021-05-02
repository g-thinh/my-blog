import { Container, Grid } from "theme-ui";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";
import { Heading, Subheading, BlogPostCard } from "@components/index";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const apiURL = `${origin}/api/blog`;
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

export default function BlogPage({ data }: any) {
  return (
    <Container p={[2, 3]}>
      <Heading>Blog Posts</Heading>
      <Subheading>
        Some of the discoveries I've made working as a front-end dev lately.
      </Subheading>
      <Grid sx={{ gridTemplateColumns: ["1fr"], gridAutoRows: "1fr" }}>
        {data.map((post) => {
          return <BlogPostCard key={post.id} data={post} />;
        })}
      </Grid>
    </Container>
  );
}
