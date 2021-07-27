import {
  ComponentProps,
  PropsWithChildren,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { Box, Flex, Container, Text, Button } from "theme-ui";
import { TabsProvider, useTabs } from "./TabsContext";

export function Tabs({
  children,
  ...props
}: PropsWithChildren<{}> & ComponentProps<typeof Container>) {
  return (
    <TabsProvider>
      <Container p={2} bg="muted" sx={{ borderRadius: "lg" }} {...props}>
        {children}
      </Container>
    </TabsProvider>
  );
}

type TabProps = PropsWithChildren<{
  tabIndex?: number;
}> &
  ComponentProps<typeof Button>;

type TabsListProps = PropsWithChildren<{}> & ComponentProps<typeof Flex>;

Tabs.List = function TabsList({ children, sx, ...props }: TabsListProps) {
  return (
    <Flex
      sx={{ borderBottom: "2px solid", borderColor: "highlight", ...sx }}
      {...props}
    >
      {Children.map(children, (child, tabIndex) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            tabIndex,
          });
        }
      })}
    </Flex>
  );
};

Tabs.ListItem = function Tab({ children, tabIndex, sx, ...props }: TabProps) {
  const { setActiveTab, activeTab } = useTabs();
  const isActive = activeTab === tabIndex;

  return (
    <Button
      p={2}
      onClick={() => setActiveTab(tabIndex)}
      sx={{
        color: isActive ? "primary" : "highlight",
        position: "relative",
        outline: "transparent solid 2px",
        outlineOffset: "0px",
        background: "transparent",

        "&:hover": { cursor: "pointer", backgroundColor: "transparent" },
        "&:active": {
          backgroundColor: "highlight",
          transition: "background-color 0.3s ease-out",
        },
        "&:focus-visible": {
          outline: "none",
          transition: "box-shadow 0.2s",
          boxShadow: "outline",
        },

        borderRadius: 0,
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        borderBottom: "3px solid",
        marginBottom: "-3px",
        ...sx,
      }}
      {...props}
    >
      <Text
        sx={{ color: isActive ? "primary" : "text", fontWeight: "heading" }}
      >
        {children}
      </Text>
    </Button>
  );
};

type TabsContentProps = PropsWithChildren<{
  tabIndex?: number;
  TabName?: string;
}> &
  ComponentProps<typeof Box>;

Tabs.Sections = function TabsContent({ children, ...props }: TabsContentProps) {
  return (
    <Box my={2} {...props}>
      {Children.map(children, (child, tabIndex) => {
        if (isValidElement(child)) {
          return cloneElement(child, { tabIndex });
        }
      })}
    </Box>
  );
};

Tabs.SectionItem = function TabContent({
  children,
  tabIndex,
  ...props
}: TabsContentProps) {
  const { activeTab } = useTabs();
  const isActive = activeTab === tabIndex;
  return isActive && <Box {...props}>{children}</Box>;
};
