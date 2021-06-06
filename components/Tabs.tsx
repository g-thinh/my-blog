import { useState } from "react";
import { Box, Flex, Container, Text, Button } from "theme-ui";

const Tab = ({ label, activeTab, handleClick }) => {
  const isActive = activeTab === label;

  return (
    <Button
      variant="tabButton"
      p={2}
      onClick={() => handleClick(label)}
      sx={{
        borderColor: isActive ? "primary" : "highlight",
      }}
    >
      <Text
        sx={{ color: isActive ? "primary" : "text", fontWeight: "heading" }}
      >
        {label}
      </Text>
    </Button>
  );
};

export const TabContent = ({ label, children }) => (
  <Box key={label}>{children}</Box>
);

export const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);
  function onClickTabItem(tab) {
    setActiveTab(tab);
  }

  return (
    <Container p={2} bg="muted" sx={{ borderRadius: "0.75rem" }}>
      <Flex
        sx={{
          borderBottom: "2px solid",
          borderColor: "highlight",
        }}
      >
        {props.children.map((child) => {
          const { label } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              handleClick={onClickTabItem}
            />
          );
        })}
      </Flex>
      <Box py={3}>
        {props.children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return (
            <Box key={child.props.label} px={2} py={2}>
              {child.props.children}
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};
