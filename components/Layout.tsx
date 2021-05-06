import { Flex, Box, Text } from "theme-ui";
import {
  Navbar,
  NavButtons,
  ScrollButton,
  FeaturedList,
} from "@components/index";

const Layout: React.FC = (props) => (
  <Flex
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <Navbar />

    <Box
      as="main"
      sx={{
        marginTop: [2, 4],
        width: "100%",
        display: ["flex", "grid"],
        flexDirection: "column",
        flex: ["1 1 auto", "none"],
        gridTemplateColumns: "1fr 48em 1fr",
        gridTemplateRows: "1fr",
      }}
    >
      <Box as="aside" sx={{ gridArea: ["none", "1 / 1 / 2 / 2"] }}></Box>
      <Box
        sx={{
          gridArea: ["none", "1 / 2 / 2 / 3"],
          width: "100%",
          maxWidth: "48em",
          mx: "auto",
          px: 0,
        }}
      >
        {props.children}
      </Box>
      <Box
        as="aside"
        sx={{
          gridArea: ["none", "1 / 3 / 2 / 4"],
        }}
      >
        <Flex
          pt={[3, 4]}
          px={3}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            flexFlow: "column",
            height: "100%",
            // backgroundColor: "goldenrod",
          }}
        >
          <FeaturedList />
        </Flex>
      </Box>
    </Box>
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
