import { Box, Flex, Text } from "theme-ui";
import { RouteLink } from "@components/RouteLink";
import NavButtons from "@components/NavButtons";

const Navbar: React.FC = () => (
  <Box as="header" mx={[0, 1]} my={[0, 3]} px={[0, 3]}>
    <Flex
      sx={{
        flexDirection: ["column", "row"],
        flex: "5",
        alignContent: "center",
        height: "100%",
      }}
    >
      <RouteLink isActive={false} href="/" index={1}>
        <Text
          as="p"
          my={[2, 0]}
          sx={{
            userSelect: "none",
            fontSize: [3, 4],
            textAlign: "center",
          }}
        >
          Gia Thinh Nguyen
          <Text color="primary" sx={{ fontWeight: "bold" }}>
            .
          </Text>
        </Text>
      </RouteLink>
      <Flex
        as="ul"
        py={[2, 0]}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flex: ["auto", "4"],
          width: "100%",
          backgroundColor: ["muted", "transparent"],
        }}
      >
        <RouteLink href="/about" index={2}>
          About
        </RouteLink>
        <RouteLink href="/blog" index={3}>
          Blog
        </RouteLink>
        <RouteLink href="/code" index={4}>
          Code
        </RouteLink>
        <RouteLink href="/food" index={5}>
          Food
        </RouteLink>
      </Flex>
      <Box
        sx={{
          display: ["none", "flex"],
          flex: "1",
          justifyContent: "flex-end",
        }}
      >
        <NavButtons />
      </Box>
    </Flex>
  </Box>
);

export default Navbar;
