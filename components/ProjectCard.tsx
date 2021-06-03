import { Text, Button, Box, Card, Flex, Image, AspectRatio } from "theme-ui";
import { format } from "date-fns";
import Link from "next/link";

export const ProjectCard = ({ data }) => {
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
          display: ["flex"],
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
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Image
            sx={{
              borderRadius: "0.5rem",
              objectFit: "cover",
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
              my={2}
              sx={{
                fontSize: [3, 4],
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {data.content.title}
            </Text>
          </Box>
          <Text
            as="p"
            color="text"
            my={[1, 3]}
            px={[2, 3]}
            sx={{
              textAlign: "center",
              fontSize: 2,
              flexGrow: 1,
            }}
          >
            {data.content.preview}
          </Text>
          <Flex py={2} sx={{ justifyContent: "center" }}>
            <Link href={data.content.demo.url}>
              <Button variant="link" sx={{ fontSize: [2, 3] }}>
                Demo
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
