import useScrollToView from "@utils/useScrollToView";
import useOnClickOutside from "@utils/useOnClickOutside";
import { useRef } from "react";
import { Box, Flex, Text, Divider, Button } from "theme-ui";
import { DropdownProvider, useDropdown } from "@components/DropdownContext";
import { Link } from "@components/Link";
import { Motion } from "@components/Motion";
import { darken } from "@theme-ui/color";

export function Dropdown({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Box>>) {
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
}: React.PropsWithChildren<React.ComponentProps<typeof Box>>) {
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

type DropdownButtonProps = React.PropsWithChildren<{
  rightIcon?: React.ReactElement<any>;
  leftIcon?: React.ReactElement<any>;
}> &
  React.ComponentProps<typeof Button>;

Dropdown.Button = function DropdownButton({
  children,
  rightIcon,
  leftIcon,
  ...props
}: DropdownButtonProps) {
  const { onTransitionEnd } = useDropdown();

  return (
    <Button
      variant="dropdown"
      mb={2}
      onClick={() => {
        onTransitionEnd((state) => !state);
      }}
      {...props}
    >
      <Flex sx={{ alignItems: "center" }}>
        {leftIcon}
        <Text pr={rightIcon ? 2 : undefined} pl={leftIcon ? 2 : undefined}>
          {children}
        </Text>
        {rightIcon}
      </Flex>
    </Button>
  );
};

type DropdownList = {
  icon?: React.ReactElement<any>;
} & React.PropsWithChildren<React.ComponentProps<typeof Box>>;

type DropdownListGroup = React.PropsWithChildren<{
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

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      onTransitionEnd(false);
    }
  };

  useScrollToView(DropdownListRef, isOpen);

  return (
    <Motion.Box
      initial="exit"
      animate={isOpen ? "enter" : "exit"}
      variants={dropdownAnimation}
    >
      <Box
        ref={DropdownListRef}
        as="ul"
        py={2}
        onBlur={handleOnBlur}
        sx={{
          backgroundColor: darken("background", 0.05),
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
    </Motion.Box>
  );
};

type DropdownItem = React.PropsWithChildren<{
  href?: string;
  rightIcon?: React.ReactElement<any>;
  leftIcon?: React.ReactElement<any>;
}> &
  React.ComponentProps<typeof Box>;

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
          backgroundColor: darken("background", 0.1),
          cursor: "pointer",
        },
        ":active": {
          backgroundColor: darken("background", 0.1),
          transition: "background-color 0.5s",
        },
        ":focus-within": {
          backgroundColor: darken("background", 0.1),
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
