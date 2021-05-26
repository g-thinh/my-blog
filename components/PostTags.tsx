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
              backgroundColor: "highlight",
              borderRadius: "1rem",
            }}
          >
            <Text color="text" sx={{ fontSize: 2 }}>
              {tag}
            </Text>
          </Badge>
        )
      )}
    </Box>
  );
};
