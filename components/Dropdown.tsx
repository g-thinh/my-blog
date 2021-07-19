import useScrollToView from "@utils/useScrollToView";
import useOnClickOutside from "@utils/useOnClickOutside";
import { motion } from "framer-motion";
import {
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  useRef,
  FocusEvent,
} from "react";
import { Box, Button, Flex, Text, Divider } from "theme-ui";
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
        }}
        {...props}
      >
        {children}
      </Box>
    </DropdownProvider>
  );
}

type DropdownButtonProps = PropsWithChildren<{
  rightIcon?: ReactElement<any>;
  leftIcon?: ReactElement<any>;
  variant?: "fill" | "nofill";
}> &
  ComponentProps<typeof Button>;

Dropdown.Button = function DropdownButton({
  children,
  rightIcon,
  leftIcon,
  variant = "fill",
  ...props
}: DropdownButtonProps) {
  const DropdownButtonRef = useRef(null);
  const { onTransitionEnd } = useDropdown();

  useOnClickOutside(DropdownButtonRef, () => onTransitionEnd(false));

  return (
    <Button
      mb={2}
      bg={variant === "fill" ? "muted" : "transparent"}
      ref={DropdownButtonRef}
      onClick={() => {
        onTransitionEnd((c) => !c);
      }}
      sx={{
        borderRadius: "md",
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

type DropdownList = {
  icon?: ReactElement<any>;
} & PropsWithChildren<ComponentProps<typeof Box>>;

type DropdownListGroup = PropsWithChildren<{
  title: string;
}>;

Dropdown.ListGroup = function DropdownListGroup({
  children,
  title,
  ...props
}: DropdownListGroup) {
  return (
    <Box>
      <Text
        px={3}
        py={2}
        sx={{ fontSize: [2], fontWeight: "bolder" }}
        {...props}
      >
        {title}
      </Text>
      {children}
    </Box>
  );
};

Dropdown.Divider = Divider;

Dropdown.List = function DropdownList({ children, ...props }: DropdownList) {
  const { isOpen, dropdownAnimation, onTransitionEnd } = useDropdown();

  const DropdownListRef = useRef<HTMLDivElement>(null);

  const handleOnBlur = (event: FocusEvent<HTMLDivElement>) => {
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
          borderRadius: "lg",
          boxShadow: "menu",
        }}
        {...props}
      >
        {children}
      </Box>
    </motion.div>
  );
};

type DropdownItem = PropsWithChildren<{
  icon?: ReactElement<any>;
}> &
  ComponentProps<typeof Box>;

Dropdown.Item = function DropdownItem({
  children,
  icon,
  ...props
}: DropdownItem) {
  return (
    <Box
      as="li"
      px={3}
      py={2}
      sx={{
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
      <Flex sx={{ alignItems: "center" }}>
        {icon}
        {icon ? <Box pl={1}>{children}</Box> : children}
      </Flex>
    </Box>
  );
};
