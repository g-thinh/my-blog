import { Badge, Box, Text } from "theme-ui";

interface Props {
  tags: string[];
}

export const PostTags = (props: Props): JSX.Element => {
  if (!props.tags) {
    return null;
  }

  return (
    <Box my={[1, 2]}>
      {props.tags.map(
        (tag): JSX.Element => (
          <Badge
            key={tag}
            mr={props.tags.length > 1 ? 3 : 0}
            px={2}
            sx={{
              fontSize: 2,
              fontFamily: "body",
              color: "background",
              backgroundColor: "accent",
              borderRadius: "1rem",
            }}
          >
            {tag}
          </Badge>
        )
      )}
    </Box>
  );
};
