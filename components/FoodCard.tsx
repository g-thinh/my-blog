import { Text, Button, Box, Card, Flex, Image } from "theme-ui";
import { format } from "date-fns";
import Link from "next/link";

export const FoodCard = ({ data }) => {
  return (
    <Link href={data.full_slug}>
      <Card
        bg="muted"
        p={[2, 3]}
        mb={[3, 4]}
        mx={[3, 4]}
        sx={{
          display: ["flex", "flex"],
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column nowrap",
          borderRadius: "card",
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
            <Text as="h3" sx={{ textAlign: "center" }}>
              {format(new Date(data.content.date), "do MMMM, yyyy")}
            </Text>
          </Box>
          <Text
            as="p"
            color="text"
            my={[1, 3]}
            sx={{
              textAlign: "center",
              fontSize: [1],
              flexGrow: 1,
            }}
          >
            {data.content.preview}
          </Text>
          <Flex sx={{ justifyContent: "center" }}>
            <Link href={data.full_slug} passHref>
              <Button variant="link">Read More</Button>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
