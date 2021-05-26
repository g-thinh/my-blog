import { useState } from "react";
import { Container, Button, Flex, Input } from "theme-ui";
import { MainHeading } from "@components/index";
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
    </Container>
  );
}
