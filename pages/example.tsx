import { useState } from "react";
import {
  Container,
  Button,
  Flex,
  Input,
  Box,
  Text,
  Divider,
  Heading,
} from "theme-ui";
import {
  MainHeading,
  Subheading,
  Tabs,
  TabContent,
  TextBlock,
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@components/index";
import { useToast } from "@components/ToastContext";
import { FiChevronDown } from "react-icons/fi";

export default function ExamplePage(): JSX.Element {
  const { dispatch } = useToast();
  const [value, setValue] = useState<string>("Toast message here");

  return (
    <Container p={[2, 3]}>
      <MainHeading>Playground</MainHeading>
      <Subheading>
        This is where build stuff that will be used on my blog! Mostly basic
        implementations of widely used web components.
      </Subheading>
      <Divider mb={3} />
      <Box py={4} px={3}>
        <Heading>Dropdown Menu</Heading>
        <TextBlock>
          This is my implementation of the dropdown menu, using Framer-Motion
          for the animation
        </TextBlock>
        <Box mt={3}>
          <Dropdown>
            <DropdownButton>
              <Text pr={3}>Posts</Text>
              <FiChevronDown />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem href="/blog">Blog</DropdownItem>
              <DropdownItem href="/code">Code</DropdownItem>
              <DropdownItem href="/food">Food</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Box>
      </Box>
      <Divider mb={3} />
      <Box py={4} px={3}>
        <Heading>Toast Notification</Heading>
        <TextBlock>
          The Snackbar or Toast notification, only renders to the bottom-center
          displaying a simple text message. Each message auto-disapears after a
          few seconds one after the other, can also be canceled on hover. Using
          Framer Motion and React Context + useReducer.
        </TextBlock>
        <Box mt={3}>
          <Input
            defaultValue={value}
            onChange={(ev) => setValue(ev.target.value)}
          />
          <Flex py={3} sx={{ justifyContent: "center" }}>
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD",
                  text: value,
                })
              }
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "muted", boxShadow: "card" },
              }}
            >
              Summon Toast
            </Button>
          </Flex>
        </Box>
      </Box>
      <Divider mb={3} />
      <Box py={4} px={3}>
        <Box mb={3}>
          <Heading>Tabs</Heading>
          <TextBlock>
            Render any content thats organized via tabs that are given a label.
            Tabs themselves are keyboard accessible.
          </TextBlock>
        </Box>
        <Tabs>
          <TabContent label="One">
            <Box mb={2}>
              <TextBlock>
                Aliquam at sapien ante. Integer imperdiet pulvinar massa vitae
                finibus. Duis placerat ex nec convallis blandit. Aliquam
                sagittis metus et posuere bibendum. Vestibulum eget bibendum
                erat, sit amet volutpat ante. Suspendisse potenti. Nullam auctor
                massa non libero convallis suscipit. Mauris lacinia, diam et
                iaculis elementum, leo metus lobortis turpis, sed rhoncus leo
                diam quis purus. Vivamus facilisis lobortis lobortis.
              </TextBlock>
            </Box>
            <Button>Read More</Button>
          </TabContent>
          <TabContent label="Two">
            <TextBlock>
              Aenean cursus arcu in nibh dapibus, in mattis justo ullamcorper.
              In vel facilisis sem. Aenean tempor justo quam. Aenean nisl velit,
              fermentum id lacus non, facilisis accumsan est. In hendrerit, dui
              eget dapibus tincidunt, enim augue cursus risus, tempor auctor
              dolor arcu blandit urna. Vivamus sollicitudin in erat a fermentum.
              Vivamus gravida dignissim mauris tristique mollis.
            </TextBlock>
          </TabContent>
          <TabContent label="Three">
            <TextBlock>
              Nothing to see here, this tab is <em>extinct</em>!
            </TextBlock>
          </TabContent>
        </Tabs>
      </Box>
    </Container>
  );
}
