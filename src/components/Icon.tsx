import { Box } from "theme-ui";

type IconProps = { size?: number | string } & React.ComponentProps<typeof Box>;

export function Icon({ size, ...props }: IconProps) {
  return (
    <Box
      sx={{ minWidth: size, minHeight: size, maxWidth: size, maxHeight: size }}
      {...props}
    />
  );
}
