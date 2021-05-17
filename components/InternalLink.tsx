import { Flex, Text, IconButton } from "theme-ui";
import { FiLink } from "react-icons/fi";
import { useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const InternalLink = (props): JSX.Element => {
  const { text, id } = props.data;
  let pathToCopy = "";

  function handleClick() {
    navigator.clipboard.writeText(pathToCopy);
  }

  useEffect(() => {
    pathToCopy = window.location.href + "#" + id.url;
  }, []);

  return (
    <Flex
      my={3}
      sx={{
        alignItems: "center",
        "&:hover button": {
          visibility: "visible",
        },
      }}
    >
      <Text id={id.url} color="secondary" sx={{ fontSize: [3, 4] }}>
        {text}
      </Text>
      <Tippy content="Copied" placement="right" trigger="click">
        <IconButton
          onClick={handleClick}
          color="grey"
          sx={{
            cursor: "pointer",
            visibility: "hidden",
            "&:hover": {
              color: "lightgrey",
            },
          }}
        >
          <FiLink size={18} />
        </IconButton>
      </Tippy>
    </Flex>
  );
};
