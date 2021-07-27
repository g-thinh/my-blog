import { Dropdown, Tabs, Link } from "@components/index";
import { useToast } from "@components/ToastContext";
import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Paragraph,
} from "theme-ui";

export default function ExamplePage(): JSX.Element {
  const { dispatch } = useToast();
  const [value, setValue] = useState<string>("Toast message here");

  return (
    <Container p={[2, 3]}>
      <Heading as="h1" mb={[2, 3]} sx={{ textAlign: "center" }}>
        Playground
      </Heading>
      <Heading
        as="h2"
        mt={[3, 4]}
        variant="subheader"
        sx={{ textAlign: "center" }}
      >
        This is where build stuff that will be used on my blog! Mostly basic
        implementations of widely used web components.
      </Heading>
      <Divider mb={3} mt={3} />
      <Box py={4} px={3}>
        <Heading>Buttons</Heading>
        <Paragraph>This is my implementation of the Buttons.</Paragraph>
        <Box mt={3}>
          <Flex sx={{ justifyContent: "space-around" }}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="nofill">No Fill</Button>
          </Flex>
        </Box>
      </Box>
      <Divider mb={3} mt={3} />
      <Box py={4} px={3}>
        <Heading>Link</Heading>
        <Paragraph>
          This is my implementation of the Link component using next/link.
        </Paragraph>
        <Box mt={3}>
          <Flex sx={{ justifyContent: "space-around" }}>
            <Link href="/">Internal Link</Link>
            <Link href="https://www.google.ca">External Link</Link>
            <Link.Button href="/">Button Link</Link.Button>
          </Flex>
        </Box>
      </Box>
      <Box py={4} px={3}>
        <Heading>Dropdown Menu</Heading>
        <Paragraph>
          This is my implementation of the dropdown menu, using Framer-Motion
          for the animation.
        </Paragraph>
        <Box mt={3}>
          <Flex sx={{ justifyContent: "space-around" }}>
            <Dropdown>
              <Dropdown.Button rightIcon={<FiChevronDown />}>
                Default
              </Dropdown.Button>
              <Dropdown.List>
                <Dropdown.ListGroup title="Main">
                  <Dropdown.Item href="/" leftIcon={<FiChevronRight />}>
                    Home
                  </Dropdown.Item>
                </Dropdown.ListGroup>
                <Dropdown.Divider />
                <Dropdown.ListGroup title="Options">
                  <Dropdown.Item href="/code">Code</Dropdown.Item>
                  <Dropdown.Item onClick={() => alert("hello there")}>
                    Alert
                  </Dropdown.Item>
                </Dropdown.ListGroup>
              </Dropdown.List>
            </Dropdown>
          </Flex>
        </Box>
      </Box>
      <Divider mb={3} />
      <Box py={4} px={3}>
        <Heading>Toast Notification</Heading>
        <Paragraph>
          The Snackbar or Toast notification, only renders to the bottom-center
          displaying a simple text message. Each message auto-disapears after a
          few seconds one after the other, can also be canceled on hover. Using
          Framer Motion and React Context + useReducer.
        </Paragraph>
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
          <Paragraph>
            Render any content thats organized via tabs that are given a label.
            Tabs themselves are keyboard accessible.
          </Paragraph>
        </Box>
        <Tabs>
          <Tabs.List>
            <Tabs.ListItem>One</Tabs.ListItem>
            <Tabs.ListItem>Two</Tabs.ListItem>
            <Tabs.ListItem>Three</Tabs.ListItem>
          </Tabs.List>
          <Tabs.Sections>
            <Tabs.SectionItem>
              <Box mb={2}>
                <Paragraph>
                  Aliquam at sapien ante. Integer imperdiet pulvinar massa vitae
                  finibus. Duis placerat ex nec convallis blandit. Aliquam
                  sagittis metus et posuere bibendum. Vestibulum eget bibendum
                  erat, sit amet volutpat ante. Suspendisse potenti. Nullam
                  auctor massa non libero convallis suscipit. Mauris lacinia,
                  diam et iaculis elementum, leo metus lobortis turpis, sed
                  rhoncus leo diam quis purus. Vivamus facilisis lobortis
                  lobortis.
                </Paragraph>
              </Box>
              <Button>Read More</Button>
            </Tabs.SectionItem>
            <Tabs.SectionItem>
              <Paragraph>
                Aenean cursus arcu in nibh dapibus, in mattis justo ullamcorper.
                In vel facilisis sem. Aenean tempor justo quam. Aenean nisl
                velit, fermentum id lacus non, facilisis accumsan est. In
                hendrerit, dui eget dapibus tincidunt, enim augue cursus risus,
                tempor auctor dolor arcu blandit urna. Vivamus sollicitudin in
                erat a fermentum. Vivamus gravida dignissim mauris tristique
                mollis.
              </Paragraph>
            </Tabs.SectionItem>
            <Tabs.SectionItem>
              <Paragraph>
                Nothing to see here, this tab is <em>extinct</em>!
              </Paragraph>
            </Tabs.SectionItem>
          </Tabs.Sections>
        </Tabs>
      </Box>
    </Container>
  );
}
