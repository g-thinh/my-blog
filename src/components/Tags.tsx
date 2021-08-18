import { Badge, Box } from "theme-ui";

interface TagProps {
  tags: string[];
}

type Colors = {
  textColor: string;
  bgColor: string;
};

function selectColors(tagName: string): Colors {
  switch (tagName.toLowerCase()) {
    case "javascript": {
      return { textColor: "#000", bgColor: "#F7B108" };
    }
    case "typescript": {
      return { textColor: "#fff", bgColor: "#2B6CB0" };
    }
    case "theme-ui": {
      return { textColor: "#fff", bgColor: "#805AD5" };
    }
    case "react": {
      return { textColor: "#000", bgColor: "#61DBFB" };
    }
    case "next.js": {
      return { textColor: "#fff", bgColor: "#000" };
    }
    case "storyblok": {
      return { textColor: "#fff", bgColor: "#00b3b0" };
    }
    case "styled-components": {
      return { textColor: "#000", bgColor: "#ED64A6" };
    }
    default: {
      return { textColor: "background", bgColor: "accent" };
    }
  }
}

export function Tags({ tags }: TagProps) {
  return (
    <Box my={[1, 2]}>
      {tags.map((tag) => {
        const { textColor, bgColor } = selectColors(tag);
        return (
          <Badge
            key={tag}
            mr={tags.length > 1 ? 3 : 0}
            px={2}
            py={1}
            my={1}
            sx={{
              fontSize: 2,
              fontFamily: "body",
              color: textColor,
              backgroundColor: bgColor,
              borderRadius: "sm",
              userSelect: "none",
            }}
          >
            {tag}
          </Badge>
        );
      })}
    </Box>
  );
}
