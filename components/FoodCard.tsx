import { Text, Box, Card, Flex } from "theme-ui";
import styled from "styled-components";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

export const FoodCard = ({ data }) => {
  return (
    <Link href={data.full_slug}>
      <Card
        bg="muted"
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          borderRadius: "card",
          "&:hover": {
            cursor: "pointer",
            boxShadow: "card",
            "& h2": {
              color: "primary",
            },
          },
        }}
        p={[2, 3]}
        mb={[3, 4]}
      >
        <Flex sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              flex: ["none", 1],
              display: ["none", "flex"],
            }}
          >
            <StyledImage
              src={data.content.image.filename}
              alt={data.content.image.alt}
              width={120}
              height={120}
            />
          </Box>
          <Flex
            px={[3, 4]}
            sx={{
              flex: "3",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              flexDirection: "column",
            }}
          >
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
            <Text as="h3">
              {format(new Date(data.content.date), "do MMMM, yyyy")}
            </Text>
            <Text
              as="p"
              color="text"
              my={[1, 3]}
              sx={{
                textAlign: "center",
                fontSize: [1],
                flexGrow: 1,
                display: "flex",
              }}
            >
              {data.content.description}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};

const StyledImage = styled(Image)({
  borderRadius: "1.5rem",
});
