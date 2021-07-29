import { Flex, Heading, IconButton } from "theme-ui";
import { useToast } from "@components/index";
import { FiLink } from "react-icons/fi";
import { useEffect, useRef } from "react";

export const InternalLink = (props): JSX.Element => {
  const { dispatch } = useToast();
  const { text, id } = props.data;
  const pathToCopy = useRef("");

  function handleClick() {
    navigator.clipboard.writeText(pathToCopy.current);
    dispatch({ type: "ADD", text: "Copied link to clipboard" });
  }

  useEffect(() => {
    pathToCopy.current = window.location.href + "#" + id.url;
  }, [pathToCopy, id.url]);

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
      <Heading
        as="h3"
        id={id.url}
        color="secondary"
        pt={["7rem", "5rem"]}
        mt={["-7rem", "-5rem"]}
        sx={{ fontSize: [4, 5] }}
      >
        {text}
      </Heading>
      <IconButton
        onClick={handleClick}
        color="grayness"
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
    </Flex>
  );
};
