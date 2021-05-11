import { Flex, Text, IconButton } from "theme-ui";
import { FiLink } from "react-icons/fi";
import { useEffect } from "react";

export const InternalLink = (props): JSX.Element => {
  const { text, id } = props.data;
  let pathToCopy = "";

  useEffect(() => {
    pathToCopy = window.location.href + "#" + id.url;
  }, []);

  return (
    <Flex
      py={3}
      sx={{
        alignItems: "center",
        "&:hover button": {
          visibility: "visible",
        },
      }}
    >
      <Text id={id.url} as="h3" color="primary" sx={{ fontSize: [2, 3] }}>
        {text}
      </Text>
      <IconButton
        onClick={() => navigator.clipboard.writeText(pathToCopy)}
        color="lightgrey"
        sx={{
          cursor: "pointer",
          visibility: "hidden",
          "&:hover": {
            color: "grey",
          },
        }}
      >
        <FiLink size={18} />
      </IconButton>
    </Flex>
  );
};
