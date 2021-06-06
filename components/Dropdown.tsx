import { Box, Link, Text, Flex } from "theme-ui";
import { useState } from "react";
import { motion } from "framer-motion";

export const DropdownButton = ({ children }) => (
  <Box
    sx={{
      borderRadius: "card",
      "&:hover": { backgroundColor: "muted", cursor: "pointer" },
    }}
  >
    <Flex
      bg="muted"
      p={2}
      sx={{
        borderRadius: "card",
        alignItems: "center",
      }}
    >
      {children}
    </Flex>
  </Box>
);

export const DropdownMenu = ({ children }) => (
  <Flex
    mt={2}
    py={2}
    bg="highlight"
    sx={{
      flexDirection: "column",
      borderRadius: "0.75rem",
      boxShadow: "menu",
      position: "absolute",
    }}
  >
    {children.map((child) =>
      child.type.name === "DropdownItem" ? child : null
    )}
  </Flex>
);

export const DropdownItem = ({ href, children }) => (
  <Flex>
    <Link
      px={3}
      py={1}
      href={href}
      sx={{
        width: "100%",
        minWidth: "14rem",
        textDecoration: "none",
        "&:hover": { backgroundColor: "muted" },
      }}
    >
      <Text>{children}</Text>
    </Link>
  </Flex>
);

export const Dropdown = ({ children }) => {
  const [isHover, toggleHover] = useState(false);

  const animation = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  function toggleHoverMenu() {
    toggleHover(!isHover);
  }

  return (
    <Box
      sx={{ maxWidth: "max-content" }}
      onMouseEnter={toggleHoverMenu}
      onMouseLeave={toggleHoverMenu}
    >
      {children.map((child) =>
        child.type.name === "DropdownButton" ? child : null
      )}
      <motion.div
        initial="enter"
        animate={isHover ? "enter" : "exit"}
        variants={animation}
      >
        {children.map((child) =>
          child.type.name === "DropdownMenu" ? child : null
        )}
      </motion.div>
    </Box>
  );
};
