import { Box, Flex, Heading, Text } from "theme-ui";
import { RouteLink } from "@components/index";
import NavButtons from "@components/NavButtons";

const Navbar = () => (
  <Box as="header" p={[0, 3]}>
    <Flex
      sx={{
        flexDirection: ["column", "row"],
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <RouteLink isActive={false} href="/">
        <Text
          py={[2, 0]}
          sx={{
            fontWeight: "body",
            userSelect: "none",
            fontSize: 5,
            textAlign: "center",
          }}
        >
          Gia Thinh Nguyen
          <Text color="primary" sx={{ fontWeight: "bold" }}>
            .
          </Text>
        </Text>
      </RouteLink>
      <Box
        as="ul"
        py={[2, 0]}
        sx={{
          width: ["100%", "auto"],
          backgroundColor: ["muted", "transparent"],
        }}
      >
        <Flex as="li" sx={{ alignItems: "center", justifyContent: "center" }}>
          <RouteLink href="/about">About</RouteLink>
          <RouteLink href="/blog">Blog</RouteLink>
          <RouteLink href="/code">Code</RouteLink>
          <RouteLink href="/food">Food</RouteLink>
          <RouteLink href="/projects"> Projects</RouteLink>
        </Flex>
      </Box>
      <Box
        sx={{
          display: ["none", "block"],
        }}
      >
        <NavButtons />
      </Box>
    </Flex>
  </Box>
);

export default Navbar;
