import { ComponentProps } from "react";
import NextImage from "next/image";
import { AspectRatio } from "@theme-ui/components";

export function Image({
  my,
  sx,
  ratio = 4 / 3,
  ...props
}: ComponentProps<typeof NextImage> & ComponentProps<typeof AspectRatio>) {
  return (
    <AspectRatio ratio={ratio} sx={{ img: { borderRadius: "md" } }} my={my}>
      <NextImage {...props} />
    </AspectRatio>
  );
}
