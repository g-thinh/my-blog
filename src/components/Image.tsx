import NextImage from "next/image";
import { AspectRatio, Text, Box, Flex } from "@theme-ui/components";

type ImageProps = { caption?: string } & React.ComponentProps<
  typeof NextImage
> &
  React.ComponentProps<typeof Box> &
  React.ComponentProps<typeof AspectRatio>;

export function Image({ ratio, caption, ...props }: ImageProps) {
  if (!ratio) {
    return (
      <Flex as="figure" sx={{ flexDirection: "column" }}>
        <Box sx={{ img: { borderRadius: "md" } }}>
          <NextImage {...props} />
        </Box>
        {caption && (
          <Text
            as="figcaption"
            color="grayness"
            sx={{ fontStyle: "italic", textAlign: "center", fontSize: 1 }}
          >
            {caption}
          </Text>
        )}
      </Flex>
    );
  }

  return (
    <Box {...props}>
      <AspectRatio
        as="figure"
        ratio={ratio}
        sx={{ img: { borderRadius: "md" } }}
      >
        <NextImage {...props} />
      </AspectRatio>
      {caption && (
        <Text
          as="figcaption"
          color="grayness"
          sx={{ fontStyle: "italic", textAlign: "center", fontSize: 1 }}
        >
          {caption}
        </Text>
      )}
    </Box>
  );
}
