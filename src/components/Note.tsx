import { Message, Paragraph } from "theme-ui";
import { RenderOptionsProps } from "storyblok-rich-text-react-renderer-ts";
import { resolvers, renderRichText } from "@utils/StoryblokResolvers";
import { darken } from "@theme-ui/color";

export type NoteProps = Partial<{
  _uid: string;
  text: Text;
  _editable: string;
}>;

type Text = {
  type: string;
  content?: Content[] | null;
};

type Content = {
  type: string;
  content?: ContentItem[] | null;
};

type ContentItem = {
  text: string;
  type: string;
};

const customParagraphResolver: RenderOptionsProps = {
  ...resolvers,
  nodeResolvers: {
    ...resolvers.nodeResolvers,
    paragraph: function NoMarginParagraph(children) {
      return <Paragraph>{children}</Paragraph>;
    },
  },
};

export const Note = ({ text }: NoteProps) => {
  return (
    <Message my={[3, 4]} sx={{ backgroundColor: darken("muted", 0.1) }}>
      {renderRichText(text, customParagraphResolver)}
    </Message>
  );
};
