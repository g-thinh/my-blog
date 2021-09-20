import { Button, Box, Flex } from "@theme-ui/components";
import { FocusScope, useFocusManager } from "@react-aria/focus";
import React, { useRef, useEffect, useCallback } from "react";
import { Icon } from "@components/Icon";
import { MenuProvider, useMenu } from "@components/MenuContext";
import { Motion } from "@components/Motion";
import { useReducedMotion } from "framer-motion";
import useOnClickOutside from "@utils/useOnClickOutside";
import { FiChevronDown } from "react-icons/fi";
import { transparentize } from "@theme-ui/color";
import { AnimatePresence } from "framer-motion";

export default function Menu({ children }: React.PropsWithChildren<{}>) {
  return (
    <MenuProvider>
      <MenuContainer>{children}</MenuContainer>
    </MenuProvider>
  );
}

function MenuContainer({ children }: React.PropsWithChildren<{}>) {
  const menuRef = useRef(null);
  const { setOpen } = useMenu();

  useOnClickOutside(menuRef, () => setOpen(false));

  return (
    <Flex
      ref={menuRef}
      sx={{
        flexDirection: "column",
        position: "relative",
      }}
    >
      {children}
    </Flex>
  );
}

Menu.Button = function MenuButton({
  children,
  ...buttonProps
}: React.PropsWithChildren<React.ComponentProps<typeof Button>>) {
  const { isOpen, setOpen, size } = useMenu();
  const shouldReduceMotion = useReducedMotion();

  return (
    <Button
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-controls={`menu-${size}`}
      id={`menubutton-${size}`}
      onClick={() => {
        setOpen(!isOpen);
      }}
      {...buttonProps}
    >
      <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
        {children}
        <Motion.Flex
          ml={3}
          animate={{ rotate: isOpen ? -180 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          sx={{ alignItems: "center" }}
        >
          <Icon size={24} as={FiChevronDown} />
        </Motion.Flex>
      </Flex>
    </Button>
  );
};

Menu.List = function MenuList({ children }: React.PropsWithChildren<{}>) {
  const { isOpen, setSize, size } = useMenu();

  useEffect(() => {
    setSize(React.Children.count(children));
  }, [children, setSize]);

  return (
    <Motion.Flex
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      mt={2}
      variants={{
        open: { opacity: 1 },
        closed: { opacity: 0 },
      }}
      transition={{ duration: 0.3 }}
      sx={{
        justifyContent: "center",
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <FocusScope autoFocus contain restoreFocus>
            <Motion.Box
              role="menu"
              aria-labelledby={`menubutton-${size}`}
              as="ul"
              bg="muted"
              py={2}
              sx={{
                width: "10rem",
                flexDirection: "column",
                borderRadius: "lg",
                boxShadow: "xl",
                position: "absolute",
                top: "100%",
                left: 0,
              }}
            >
              {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    index,
                  });
                }
              })}
            </Motion.Box>
          </FocusScope>
        )}
      </AnimatePresence>
    </Motion.Flex>
  );
};

type MenuItemProps = React.PropsWithChildren<
  React.ComponentPropsWithRef<typeof Button> & {
    index?: number;
    href?: string;
  }
>;

Menu.Item = function LinkItem({
  children,
  index,
  onClick,
  ...buttonProps
}: MenuItemProps) {
  const { setOpen, currentFocus, setCurrentFocus, size } = useMenu();
  const focusManager = useFocusManager();

  //TODO: Add Letter navigation
  const OnArrowKeysDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (event.key) {
        case "ArrowDown":
          focusManager.focusNext({ wrap: true });
          console.log();
          setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
          event.preventDefault();
          break;
        case "ArrowUp":
          focusManager.focusPrevious({ wrap: true });
          setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
          event.preventDefault();
          break;

        case "Home":
          focusManager.focusFirst();
          setCurrentFocus(0);
          event.preventDefault();
          break;

        case "End":
          focusManager.focusLast();
          setCurrentFocus(size - 1);
          event.preventDefault();
          break;

        case "Escape":
          setOpen(false);
          setCurrentFocus(0);
          break;
      }
    },
    [currentFocus, setCurrentFocus, focusManager, setOpen, size]
  );

  const handleOnMouseEnter = useCallback(() => {
    setCurrentFocus(index);
  }, [setCurrentFocus, index]);

  return (
    <Box as="li" role="none">
      <Button
        variant="reset"
        role="menuitem"
        p={2}
        tabIndex={currentFocus === index ? 0 : -1}
        onKeyDown={OnArrowKeysDown}
        onMouseEnter={handleOnMouseEnter}
        onClick={(e) => {
          if (onClick) onClick(e);
          setOpen(false);
        }}
        bg="transparent"
        sx={{
          fontSize: [2, 3],
          display: "inline-block",
          textAlign: "left",
          width: "100%",
          textDecoration: "none",
          "&:focus, :hover": {
            outline: "none",
            textDecoration: "none",
            backgroundColor:
              currentFocus === index
                ? transparentize("primary", 0.8)
                : undefined,
          },
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    </Box>
  );
};
