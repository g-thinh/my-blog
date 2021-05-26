import { Container, Button, Flex, Box } from "theme-ui";
import { MainHeading } from "@components/index";
import { useToast } from "@components/ToastContext";

export default function ExamplePage(): JSX.Element {
  const { state, dispatch } = useToast();

  return (
    <Container p={[2, 3]}>
      <MainHeading>Playground</MainHeading>
      <Flex py={3} sx={{ justifyContent: "center" }}>
        <Button
          onClick={() => dispatch({ type: "ADD", text: "hello world" })}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "muted", boxShadow: "card" },
          }}
        >
          Summon Toast
        </Button>
      </Flex>
      <Box sx={{ width: "100%" }}>
        <pre>
          <code>{JSON.stringify(state.list, undefined, 2)}</code>
        </pre>
      </Box>
    </Container>
  );
}
