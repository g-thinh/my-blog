import { Flex, Box, Text } from "theme-ui";
import { Navbar, NavButtons, ScrollButton } from "@components/index";

const Layout: React.FC = (props) => (
  <Flex
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <Navbar />

    <Flex
      as="main"
      sx={{
        marginTop: [2, 4],
        width: "100%",
        flex: "1 1 auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "48em",
          mx: "auto",
          px: [1, 3],
        }}
      >
        {props.children}
      </Box>
    </Flex>
    <Flex my={[2, 3]} sx={{ justifyContent: "center" }}>
      <ScrollButton />
    </Flex>

    <Box
      as="footer"
      sx={{
        width: "100%",
      }}
    >
      <Box py={[2, 3]} bg="muted">
        <Box
          sx={{
            display: ["block", "none"],
          }}
        >
          <NavButtons />
        </Box>
        <Text
          as="p"
          sx={{
            fontSize: 0,
            filter: "brightness(75%)",
            textAlign: "center",
          }}
        >
          © 2021 All rights probably deserved.
        </Text>
      </Box>
    </Box>
  </Flex>
);

export default Layout;
