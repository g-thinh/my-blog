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
import { Link } from "@components/index";

export function Dropdown({
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof Box>>) {
  return (
    <DropdownProvider>
      <DropdownContainer {...props}>{children}</DropdownContainer>
    </DropdownProvider>
  );
}

function DropdownContainer({
  children,
  sx,
  ...props
}: PropsWithChildren<ComponentProps<typeof Box>>) {
  const { onTransitionEnd } = useDropdown();
  const ContainerRef = useRef(null);

  useOnClickOutside(ContainerRef, () => onTransitionEnd(false));

  return (
    <Box
      ref={ContainerRef}
      sx={{
        position: "relative",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
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
  const { onTransitionEnd } = useDropdown();

  return (
    <Button
      mb={2}
      bg={variant === "fill" ? "muted" : "transparent"}
      onClick={() => {
        onTransitionEnd((state) => !state);
      }}
      sx={{
        "&:active": {
          outline: "none",
          transition: "box-shadow 0.2s",
          boxShadow: "0px 0px 1px 3px #4299e1",
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
      <Text mx={3} sx={{ fontSize: [2], fontWeight: "bolder" }} {...props}>
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
  href?: string;
  rightIcon?: ReactElement<any>;
  leftIcon?: ReactElement<any>;
}> &
  ComponentProps<typeof Box>;

Dropdown.Item = function DropdownItem({
  children,
  onClick,
  href,
  rightIcon,
  leftIcon,
  ...props
}: DropdownItem) {
  const ref = useRef(null);

  const ChildrenWithIcon =
    leftIcon || rightIcon ? (
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: rightIcon ? "space-between" : undefined,
        }}
      >
        {leftIcon}
        <Text pl={leftIcon && 1} pr={rightIcon && 1}>
          {children}
        </Text>
        {rightIcon}
      </Flex>
    ) : (
      children
    );

  return (
    <Box
      as="li"
      onClick={onClick}
      ref={ref}
      onMouseEnter={(e) => {
        console.log("hovering on item");
        ref.current.focus();
        console.log(e.currentTarget);
      }}
      sx={{
        ":hover": {
          backgroundColor: "muted",
          cursor: "pointer",
        },
        ":active": {
          backgroundColor: "muted",
          transition: "background-color 0.5s",
        },
        ":focus-within": {
          backgroundColor: "muted",
        },
      }}
      {...props}
    >
      {href ? (
        <Link
          px={3}
          py={2}
          href={href}
          sx={{
            display: "block",
            width: "100%",
            textAlign: "left",

            //Overwrite these defaults
            ":hover": { color: "text", textDecoration: "none" },
            ":focus-visible": { outline: "none", textDecoration: "none" },
          }}
        >
          {ChildrenWithIcon}
        </Link>
      ) : null}
      {onClick && (
        <Button
          px={3}
          py={2}
          sx={{
            display: "block",
            width: "100%",
            textAlign: "left",

            //Overwrite these defaults
            backgroundColor: "transparent",
            ":focus": {
              boxShadow: "none",
            },
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Text>{ChildrenWithIcon}</Text>
        </Button>
      )}
      {!href && !onClick && (
        <Text
          px={3}
          py={2}
          sx={{ display: "block", width: "100%", textAlign: "left" }}
        >
          {ChildrenWithIcon}
        </Text>
      )}
    </Box>
  );
};
