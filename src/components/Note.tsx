import { Message, Paragraph } from "theme-ui";
import { RenderOptionsProps } from "storyblok-rich-text-react-renderer-ts";
import { resolvers, renderRichText } from "@utils/StoryblokResolvers";
import { darken } from "@theme-ui/color";

const customParagraphResolver: RenderOptionsProps = {
  ...resolvers,
  nodeResolvers: {
    ...resolvers.nodeResolvers,
    paragraph: function NoMarginParagraph(children) {
      return <Paragraph>{children}</Paragraph>;
    },
  },
};

export const Note = ({ data }) => {
  return (
    <Message my={[3, 4]} sx={{ backgroundColor: darken("muted", 0.1) }}>
      {renderRichText(data.text, customParagraphResolver)}
    </Message>
  );
};
