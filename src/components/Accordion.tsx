import { Motion } from "@components/Motion";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { Flex, Heading } from "@theme-ui/components";
import React, { useState } from "react";
import { useAccordion, AccordionProvider } from "@components/AccordionContext";
import { useTheme } from "@styles/theme";
import { Icon } from "@components/Icon";
import { FiChevronDown } from "react-icons/fi";
import { FocusScope, useFocusManager } from "@react-aria/focus";

type AccordionProps = React.PropsWithChildren<{
  allowMultiple?: boolean;
  allowToggle?: boolean;
}> &
  React.ComponentProps<typeof Flex>;

export function Accordion({
  children,
  allowMultiple,
  allowToggle,
  ...props
}: AccordionProps) {
  return (
    <AccordionProvider>
      <Flex sx={{ flexDirection: "column", width: "100%" }} {...props}>
        <FocusScope restoreFocus>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                itemIndex: index,
                allowMultiple,
                allowToggle,
              });
            }
          })}
        </FocusScope>
      </Flex>
    </AccordionProvider>
  );
}

type AccordionItemProps = React.PropsWithChildren<{
  itemIndex?: number;
  title?: string;
}> &
  React.ComponentProps<typeof Motion.Button> &
  Pick<AccordionProps, "allowMultiple" | "allowToggle">;

Accordion.Panel = function AccordionItem({
  children,
  title,
  itemIndex,
  allowMultiple,
  allowToggle,
  ...buttonProps
}: AccordionItemProps) {
  const {
    theme: { colors },
  } = useTheme();
  const { expanded, setExpanded } = useAccordion();
  const [allowOpen, setAllowOpen] = useState(false);
  const focusManager = useFocusManager();
  const shouldReduceMotion = useReducedMotion();
  const isOpen = allowMultiple ? allowOpen : itemIndex === expanded;

  const OnArrowKeysDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        focusManager.focusNext({ wrap: true });
        event.preventDefault();
        break;
      case "ArrowUp":
        focusManager.focusPrevious({ wrap: true });
        event.preventDefault();
        break;
    }
  };

  const handleOnButtonClick = () => {
    if (allowMultiple) {
      setAllowOpen(!allowOpen);
    } else {
      setExpanded(isOpen ? (allowToggle ? false : itemIndex) : itemIndex);
    }
  };

  return (
    <>
      <Heading as="h3" sx={{ fontSize: [2, 3] }}>
        <Motion.Button
          aria-expanded={isOpen}
          initial={false}
          animate={{
            backgroundColor: isOpen ? colors.highlight : colors.muted,
          }}
          onClick={handleOnButtonClick}
          onKeyDown={OnArrowKeysDown}
          mb={3}
          sx={{
            background: "primary",
            borderRadius: 10,
            color: "white",
            cursor: "pointer",
            width: "100%",
            height: "40px",
          }}
          {...buttonProps}
        >
          <Flex
            color={isOpen ? colors.background : colors.text}
            sx={{
              justifyContent: title ? "space-between" : "flex-end",
              alignItems: "center",
            }}
          >
            {title}
            <Motion.Flex
              animate={{ rotate: isOpen ? -180 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
              sx={{ alignItems: "center" }}
            >
              <Icon size={24} as={FiChevronDown} />
            </Motion.Flex>
          </Flex>
        </Motion.Button>
      </Heading>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.Box
            as="section"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
          >
            <Motion.Box
              role="region"
              px={2}
              mb={3}
              transition={{ duration: 0.3 }}
            >
              {children}
            </Motion.Box>
          </Motion.Box>
        )}
      </AnimatePresence>
    </>
  );
};
