import { Container, Grid } from "theme-ui";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";
import { FoodCard, Heading, Subheading } from "@components/index";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const apiURL = `${origin}/api/food`;
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

export default function AboutPage({ data }: any) {
  return (
    <Container
      my="auto"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Heading>Food stuff 🤤</Heading>
      <Subheading>
        Here are some of the recipes I've been cooking up lately that were worth
        sharing.
      </Subheading>
      <Grid
        sx={{ gridTemplateColumns: ["1fr", "1fr 1fr"], gridAutoRows: "1fr" }}
      >
        {data.map((post) => {
          return <FoodCard key={post.id} data={post} />;
        })}
      </Grid>
    </Container>
  );
}
