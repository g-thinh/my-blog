import React, { ComponentProps } from "react";
import NextImage from "next/image";
import { AspectRatio, Text, Box } from "@theme-ui/components";

type ImageProps = { caption?: string } & ComponentProps<typeof NextImage> &
  ComponentProps<typeof Box> &
  React.ComponentProps<typeof AspectRatio>;

export function Image({ ratio = 4 / 3, caption, ...props }: ImageProps) {
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
