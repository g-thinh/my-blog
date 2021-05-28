import { Message } from "theme-ui";
import { TextBlock } from "@components/index";
import { render } from "storyblok-rich-text-react-renderer";
import { NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";

export const Note = ({ data }) => {
  const resolver = {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => <TextBlock>{children}</TextBlock>,
    },
  };
  return <Message my={[3, 4]}>{render(data.text, resolver)}</Message>;
};
