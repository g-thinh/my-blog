import { Message, Paragraph } from "theme-ui";
import { darken, transparentize } from "@theme-ui/color";

export const Note = ({
  children,
  ...props
}: React.PropsWithChildren<{}> & React.ComponentProps<typeof Message>) => {
  return (
    <Message
      my={[3, 4]}
      sx={{ backgroundColor: transparentize("grayness", 0.8) }}
      {...props}
    >
      {children}
    </Message>
  );
};
