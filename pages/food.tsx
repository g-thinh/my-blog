import { Container, Text, Grid } from "theme-ui";
import { GetServerSideProps } from "next";
import absoluteUrl from "next-absolute-url";
import { FoodCard } from "@components/FoodCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { origin } = absoluteUrl(context.req);
    const apiURL = `${origin}/api/food`;
    const res = await fetch(apiURL);
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.log("Error", error);
    return { props: {} };
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
      <Text
        as="h1"
        color="text"
        my={[2, 3]}
        sx={{
          fontSize: [4, 5],
          textAlign: ["center", "left"],
          fontWeight: "bold",
        }}
      >
        Food stuff 🤤
      </Text>
      <Text
        as="p"
        color="text"
        mb={[4, 5]}
        sx={{ textAlign: ["center", "left"], fontSize: [3] }}
      >
        Here are some of the recipes I've been cooking up lately that were worth
        sharing.
      </Text>
      <Grid
        sx={{ gridTemplateColumns: ["1fr", "1fr 1fr"], gridAutoRows: "1fr" }}
      >
        {data.map((post) => {
          return <FoodCard data={post} />;
        })}
      </Grid>
    </Container>
  );
}
