import { useState } from "react";
import { Container, Button, Flex, Input, Box, Text } from "theme-ui";
import { MainHeading, Tabs, TabContent, TextBlock } from "@components/index";
import { useToast } from "@components/ToastContext";

export default function ExamplePage(): JSX.Element {
  const { dispatch } = useToast();
  const [value, setValue] = useState<string>("Toast message here");

  return (
    <Container p={[2, 3]}>
      <MainHeading>Playground</MainHeading>
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
      <Tabs>
        <TabContent label="Gator">
          <TextBlock>I can write text here If I want to</TextBlock>
          <Box>
            <Button>Click me</Button>
          </Box>

          <Text color="primary">Hello there i am some random text</Text>
        </TabContent>
        <TabContent label="Croc">
          <TextBlock>
            After 'while, <em>Crocodile</em>!
          </TextBlock>
        </TabContent>
        <TabContent label="Sarcosuchus">
          <TextBlock>
            Nothing to see here, this tab is <em>extinct</em>!
          </TextBlock>
        </TabContent>
      </Tabs>
    </Container>
  );
}
