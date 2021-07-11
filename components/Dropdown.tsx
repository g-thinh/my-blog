import useScrollToView from "@styles/useScrollToView";
import useOnClickOutside from "@utils/useOnClickOutside";
import { motion } from "framer-motion";
import React, {
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  useRef,
} from "react";
import { Box, Button, Flex, Link, Text } from "theme-ui";
import { DropdownProvider, useDropdown } from "./DropdownContext";

export function Dropdown({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof Box>>) {
  return (
    <DropdownProvider>
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
        }}
        {...props}
      >
        {children}
      </Box>
    </DropdownProvider>
  );
}

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);

type DropdownButtonProps = PropsWithChildren<{
  rightIcon?: ReactElement<any>;
  leftIcon?: ReactElement<any>;
  variant?: "default" | "transparent";
}> &
  ComponentProps<typeof Button>;

Dropdown.Button = function DropdownButton({
  children,
  rightIcon,
  leftIcon,
  variant = "default",
  ...props
}: DropdownButtonProps) {
  const DropdownButtonRef = useRef(null);
  const { onTransitionEnd } = useDropdown();

  useOnClickOutside(DropdownButtonRef, () => onTransitionEnd(false));

  return (
    <Button
      mb={2}
      bg={variant === "default" ? "muted" : "transparent"}
      ref={DropdownButtonRef}
      onClick={() => {
        onTransitionEnd((c) => !c);
      }}
      sx={{
        "&:focus": {
          outline: "none",
          boxShadow: "0px 0px 1px 3px #CB82D9",
        },
        borderRadius: "card",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      {...props}
    >
      <Flex sx={{ alignItems: "center" }}>
        {leftIcon}
        <Text pr={rightIcon ? 3 : undefined} pl={leftIcon ? 3 : undefined}>
          {children}
        </Text>
        {rightIcon}
      </Flex>
    </Button>
  );
};

Dropdown.List = function DropdownList({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof Box>>) {
  const { isOpen, dropdownAnimation, onTransitionEnd } = useDropdown();

  const DropdownListRef = useRef<HTMLDivElement>(null);

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      onTransitionEnd(false);
    }
  };

  useScrollToView(DropdownListRef, isOpen);

  return (
    <motion.div
      initial="exit"
      animate={isOpen ? "enter" : "exit"}
      variants={dropdownAnimation}
    >
      <Box
        ref={DropdownListRef}
        bg="highlight"
        as="ul"
        py={2}
        onBlur={handleOnBlur}
        sx={{
          width: "100%",
          minWidth: "10rem",
          position: "absolute",
          borderRadius: "0.75rem",
          boxShadow: "menu",
        }}
        {...props}
      >
        {children}
      </Box>
    </motion.div>
  );
};

Dropdown.Item = function DropdownItem({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof Box>>) {
  return (
    <Box
      as="li"
      sx={{
        padding: 2,
        textAlign: "center",
        ":hover": {
          backgroundColor: "muted",
          cursor: "pointer",
        },
        ":focus-within": {
          backgroundColor: "muted",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
