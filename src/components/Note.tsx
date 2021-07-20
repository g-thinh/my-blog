import { Message, Paragraph } from "theme-ui";
import { render } from "storyblok-rich-text-react-renderer";
import { NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";

export const Note = ({ data }) => {
  const resolver = {
    nodeResolvers: {
      [NODE_PARAGRAPH]: function NodeParagraph(children) {
        return <Paragraph>{children}</Paragraph>;
      },
    },
  };
  return <Message my={[3, 4]}>{render(data.text, resolver)}</Message>;
};
