import { Flex, Heading, IconButton } from "theme-ui";
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
      mb={[1, 2]}
      sx={{
        alignItems: "center",
        "&:hover button": {
          visibility: "visible",
        },
      }}
    >
      <Heading as="h3" id={id.url} color="secondary" sx={{ fontSize: [4, 5] }}>
        {text}
      </Heading>
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
