import { Message, Paragraph } from "theme-ui";
import { darken } from "@theme-ui/color";

export const Note = ({
  children,
  ...props
}: React.PropsWithChildren<{}> & React.ComponentProps<typeof Message>) => {
  return (
    <Message
      my={[3, 4]}
      sx={{ backgroundColor: darken("muted", 0.1) }}
      {...props}
    >
      <Paragraph>{children}</Paragraph>
    </Message>
  );
};
