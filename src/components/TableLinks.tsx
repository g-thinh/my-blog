import { Flex, IconButton, Text, Container, Link } from "theme-ui";

interface Props {
  items: any;
}

export const TableLinks = (props: Props): JSX.Element => {
  return (
    <Flex py={[3, 4]} sx={{ justifyContent: "center" }}>
      <Container
        as="ul"
        bg="muted"
        sx={{
          width: ["100%", "80%"],
          borderRadius: "lg",
          overflow: "hidden",
          boxShadow: "md",
        }}
      >
        <Flex sx={{ flexFlow: "column nowrap" }}>
          <Text my={1} p={[2, 3]} sx={{ fontSize: [3, 4] }}>
            Table of Contents
          </Text>
          {props.items.map((item, index) => {
            return (
              <Link
                key={item._uid}
                color="text"
                p={[2, 3]}
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    bg: "hover",
                    "& span": {
                      color: "primary",
                    },
                  },
                  "&:focus": {
                    bg: "hover",
                    "& span": {
                      color: "primary",
                    },
                  },
                }}
                href={item.link.url}
              >
                <Flex sx={{ alignItems: "center" }}>
                  <IconButton
                    tabIndex={-1}
                    p={[2, 3]}
                    mr={3}
                    bg="primary"
                    color="black"
                    sx={{ fontWeight: "bold", borderRadius: "50%" }}
                  >
                    {index + 1}
                  </IconButton>
                  <Text as="span" sx={{ fontWeight: "bold", fontSize: [2, 3] }}>
                    {item.text}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Container>
    </Flex>
  );
};
