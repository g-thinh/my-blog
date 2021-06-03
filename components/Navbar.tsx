import { Box, Flex, Heading, Text } from "theme-ui";
import { RouteLink } from "@components/RouteLink";
import NavButtons from "@components/NavButtons";

const Navbar: React.FC = () => (
  <Box as="header" p={[0, 3]}>
    <Flex
      sx={{
        flexDirection: ["column", "row"],
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <RouteLink isActive={false} href="/" index={1}>
        <Heading
          py={[2, 0]}
          sx={{
            fontWeight: "body",
            userSelect: "none",
            fontSize: 4,
            textAlign: "center",
          }}
        >
          Gia Thinh Nguyen
          <Text as="span" color="primary" sx={{ fontWeight: "bold" }}>
            .
          </Text>
        </Heading>
      </RouteLink>
      <Box
        as="ul"
        py={[2, 0]}
        sx={{
          width: ["100%", "auto"],
          backgroundColor: ["muted", "transparent"],
        }}
      >
        <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
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
          <RouteLink href="/projects" index={6}>
            Projects
          </RouteLink>
        </Flex>
      </Box>
      <Box
        sx={{
          display: ["none", "block"],
          justifyContent: "flex-end",
        }}
      >
        <NavButtons />
      </Box>
    </Flex>
  </Box>
);

export default Navbar;
