import { Card, Box, Flex, Image, Text, Heading } from "theme-ui";
import { darken, transparentize } from "@theme-ui/color";

type AuthorInfoProps = {
  content: Content;
};
type Content = {
  _uid: string;
  image: Image;
  title: string;
  component: string;
  description: string;
  _editable: string;
};

type Image = {
  id: number;
  alt: string;
  _uid: string;
  name: string;
  focus?: null;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
};

export function AuthorInfo({ content }: AuthorInfoProps) {
  const { image, description, title } = content;
  return (
    <Card
      p={3}
      sx={{
        backgroundColor: transparentize("primary", 0.5),
        color: transparentize("primary", 0.9),
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: "xl",
        boxShadow: "xl",
      }}
    >
      <Flex sx={{ alignItems: "center", flexDirection: ["column", "row"] }}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Image
            src={image.filename}
            alt={image.alt}
            sx={{
              borderRadius: "50%",
              width: ["180px", "200px"],
              height: ["180px", "200px"],
              // borderWidth: 2,
              // borderStyle: "solid",
              // borderColor: "text",
              boxShadow: "sm",
            }}
          />
        </Box>
        <Box px={3} py={[3, 0]}>
          <Heading
            as="h6"
            color="text"
            sx={{
              fontWeight: "bold",
              fontSize: 4,
              textAlign: ["center", "start"],
            }}
          >
            {title}
          </Heading>
          <Text as="p">{description}</Text>
        </Box>
      </Flex>
    </Card>
  );
}
