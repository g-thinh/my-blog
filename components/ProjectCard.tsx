import { Text, Button, Box, Card, Flex, Image } from "theme-ui";
import { PostTags } from "@components/index";
import Link from "next/link";

export const ProjectCard = ({ data }) => (
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
      borderRadius: "xl",
      "&:hover": {
        boxShadow: "card",
        "& h2": {
          color: "primary",
        },
      },
      "&:focus-within": {
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
          borderRadius: "md",
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
        <Flex sx={{ justifyContent: "center" }}>
          <PostTags tags={data.tag_list} />
        </Flex>
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
      <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
        <Box px={2}>
          <Link href={data.content.demo.url}>
            <Button variant="link" sx={{ fontSize: [1, 2] }}>
              Demo
            </Button>
          </Link>
        </Box>
        <Box px={2}>
          <Link href={data.content.github.url}>
            <Button variant="link" sx={{ fontSize: [1, 2] }}>
              Github
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  </Card>
);
