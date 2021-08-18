import { Box } from "theme-ui";

type IconProps = { size?: number | string } & React.ComponentProps<typeof Box>;

export function Icon({ size, ...props }: IconProps) {
  return <Box sx={{ width: size, height: size }} {...props} />;
}
