import { Dropdown, Tabs } from "@components/index";
import { useToast } from "@components/ToastContext";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Paragraph,
  Text,
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
        <Heading>Dropdown Menu</Heading>
        <Paragraph>
          This is my implementation of the dropdown menu, using Framer-Motion
          for the animation
        </Paragraph>
        <Box mt={3}>
          <Flex sx={{ justifyContent: "space-around" }}>
            <Dropdown>
              <Dropdown.Button rightIcon={<FiChevronRight />}>
                Default
              </Dropdown.Button>
              <Dropdown.List>
                <Dropdown.Item>
                  <Link
                    href="#"
                    sx={{ textDecoration: "none", outline: "none" }}
                  >
                    <Text>Item 1</Text>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    href="#"
                    sx={{ textDecoration: "none", outline: "none" }}
                  >
                    <Text>Item 1</Text>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    onClick={() => alert("hello there")}
                    sx={{
                      padding: 0,
                      backgroundColor: "transparent",
                      ":focus": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    <Text>Item 3</Text>
                  </Button>
                </Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
            <Dropdown>
              <Dropdown.Button variant="nofill" rightIcon={<FiChevronRight />}>
                Default
              </Dropdown.Button>
              <Dropdown.List>
                <Dropdown.ListGroup title="Main">
                  <Dropdown.Item icon={<FiChevronRight />}>
                    <Link
                      href="#"
                      sx={{ textDecoration: "none", outline: "none" }}
                    >
                      <Text>Item 1</Text>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.ListGroup>
                <Dropdown.Divider />
                <Dropdown.ListGroup title="Options">
                  <Dropdown.Item>
                    <Link
                      href="#"
                      sx={{ textDecoration: "none", outline: "none" }}
                    >
                      <Text>Item 2</Text>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      onClick={() => alert("hello there")}
                      sx={{
                        padding: 0,
                        backgroundColor: "transparent",
                        ":focus": {
                          boxShadow: "none",
                        },
                      }}
                    >
                      <Text>Item 3</Text>
                    </Button>
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
