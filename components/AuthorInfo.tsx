import { Card, Box, Flex, Image, Text } from "theme-ui";

export const AuthorInfo = (props) => {
  const { content } = props;

  return (
    <Card bg="highlight" p={3} sx={{ borderRadius: "card", boxShadow: "card" }}>
      <Flex sx={{ alignItems: "center", flexDirection: ["column", "row"] }}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Image
            src={content.image.filename}
            alt={content.image.alt}
            sx={{
              borderRadius: "50%",
              width: ["180px", "200px"],
              height: ["180px", "200px"],
              borderWidth: 5,
              borderStyle: "solid",
              borderColor: "muted",
            }}
          />
        </Box>
        <Box px={3} py={[3, 0]}>
          <Text
            as="h6"
            color="white"
            sx={{
              fontWeight: "bold",
              fontSize: 4,
              textAlign: ["center", "start"],
            }}
          >
            {content.title}
          </Text>
          <Text as="p">{content.description}</Text>
        </Box>
      </Flex>
    </Card>
  );
};
