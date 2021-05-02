import { Text, Box, Card } from "theme-ui";
import styled from "styled-components";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

export const FoodCard = ({ data }) => {
  return (
    <Link href={data.full_slug}>
      <Card
        bg="muted"
        p={[2, 3]}
        mb={[3, 4]}
        mx={[3, 4]}
        sx={{
          display: ["flex", "block"],
          justifyContent: "center",
          borderRadius: "card",
          "&:hover": {
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
          <StyledImage
            src={data.content.image.filename}
            alt={data.content.image.alt}
            width={120}
            height={120}
          />
        </Box>
        <Box>
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
            }}
          >
            {data.content.description}
          </Text>
        </Box>
      </Card>
    </Link>
  );
};

const StyledImage = styled(Image)({
  borderRadius: "1.5rem",
});
