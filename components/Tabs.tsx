import {
  ComponentProps,
  PropsWithChildren,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { Box, Flex, Container, Text, Button } from "theme-ui";
import { TabsProvider, useTabs } from "./TabsContext";

export function Tabs({ children }: PropsWithChildren<{}>) {
  return (
    <TabsProvider>
      <Container p={2} bg="muted" sx={{ borderRadius: "lg" }}>
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

Tabs.List = function TabsList({ children }: TabsListProps) {
  return (
    <Flex sx={{ borderBottom: "2px solid", borderColor: "highlight" }}>
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

Tabs.ListItem = function Tab({ children, tabIndex, ...props }: TabProps) {
  const { setActiveTab, activeTab } = useTabs();
  const isActive = activeTab === tabIndex;

  return (
    <Button
      variant="tabButton"
      p={2}
      onClick={() => setActiveTab(tabIndex)}
      sx={{
        borderColor: isActive ? "primary" : "highlight",
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
