import { Message, Paragraph } from "theme-ui";
import { RenderOptionsProps } from "storyblok-rich-text-react-renderer-ts";
import { resolvers, renderRichText } from "@utils/StoryblokResolvers";

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
    <Message my={[3, 4]}>
      {renderRichText(data.text, customParagraphResolver)}
    </Message>
  );
};
