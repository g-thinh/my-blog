import React from "react";
import { Box, Flex, Container, Text, Button } from "theme-ui";
import { TabsProvider, useTabs } from "@components/TabsContext";
import { darken } from "@theme-ui/color";

export function Tabs({
  children,
  ...props
}: React.PropsWithChildren<{}> & React.ComponentProps<typeof Container>) {
  return (
    <TabsProvider>
      <Container p={2} bg="muted" sx={{ borderRadius: "lg" }} {...props}>
        {children}
      </Container>
    </TabsProvider>
  );
}

type TabProps = React.PropsWithChildren<{
  tabIndex?: number;
}> &
  React.ComponentProps<typeof Button>;

type TabsListProps = React.PropsWithChildren<React.ComponentProps<typeof Flex>>;

Tabs.List = function TabsList({ children, sx, ...props }: TabsListProps) {
  return (
    <Flex
      sx={{ borderBottom: "3px solid", borderColor: "grayness", ...sx }}
      {...props}
    >
      {React.Children.map(children, (child, tabIndex) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
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
        color: isActive ? "primary" : "grayness",
        position: "relative",
        outline: "transparent solid 3px",
        outlineOffset: "0px",
        background: "transparent",

        "&:hover": { cursor: "pointer", backgroundColor: "transparent" },
        "&:active": {
          backgroundColor: darken("muted", 0.1),
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

type TabsContentProps = React.PropsWithChildren<{
  tabIndex?: number;
  TabName?: string;
}> &
  React.ComponentProps<typeof Box>;

Tabs.Sections = function TabsContent({ children, ...props }: TabsContentProps) {
  return (
    <Box my={2} {...props}>
      {React.Children.map(children, (child, tabIndex) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { tabIndex });
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
