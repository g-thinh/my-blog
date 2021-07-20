import { Text, Button, Box, Card, Flex, Image } from "theme-ui";
import { format } from "date-fns";
import Link from "next/link";

export const FoodCard = ({ data }) => {
  return (
    <Link href={data.full_slug} passHref>
      <Card
        as="a"
        bg="muted"
        p={[2, 3]}
        mb={[3, 4]}
        mx={[3, 4]}
        sx={{
          textDecoration: "none",
          display: ["flex", "flex"],
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column nowrap",
          borderRadius: "xl",
          "&:hover": {
            cursor: "pointer",
            boxShadow: "card",
            "& h2": {
              color: "primary",
            },
          },
          "&:focus-within": {
            cursor: "pointer",
            boxShadow: "card",
            "& h2": {
              color: "primary",
            },
          },
        }}
      >
        <Box
          sx={{
            display: ["none", "flex"],
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <Image
            sx={{
              borderRadius: "0.5rem",
              objectFit: "cover",
              width: "120px",
              height: "120px",
            }}
            src={data.content.image.filename}
            alt={data.content.image.alt}
          />
        </Box>
        <Flex sx={{ flex: "1", flexFlow: "column nowrap" }}>
          <Box my={[2, 3]}>
            <Text
              as="h2"
              color="text"
              sx={{
                fontSize: [2, 3],
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {data.content.title}
            </Text>
            <Text as="h3" sx={{ fontSize: [2, 3], textAlign: "center" }}>
              {format(new Date(data.content.date), "do MMMM, yyyy")}
            </Text>
          </Box>
          <Text
            as="p"
            color="text"
            my={[1, 3]}
            sx={{
              textAlign: "center",
              fontSize: 2,
              flexGrow: 1,
            }}
          >
            {data.content.preview}
          </Text>
          <Flex py={2} sx={{ justifyContent: "center" }}>
            <Button variant="link" sx={{ fontSize: [2, 3] }}>
              Read More
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
