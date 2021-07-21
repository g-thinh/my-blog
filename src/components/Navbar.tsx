import { Box, Flex, Heading, Text } from "theme-ui";
import { Link } from "@components/index";
import NavButtons from "@components/NavButtons";

const Navbar = () => (
  <Box as="header" p={[1, 2]}>
    <Flex
      sx={{
        flexDirection: ["column", "row"],
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Link isActive={false} href="/" my={[2, 3]}>
        <Text
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
      </Link>
      <Box
        as="ul"
        py={[2, 0]}
        sx={{
          width: ["100%", "auto"],
          backgroundColor: ["muted", "transparent"],
        }}
      >
        <Flex as="li" sx={{ alignItems: "center", justifyContent: "center" }}>
          <Link href="/about" mx={[2, 3]}>
            About
          </Link>
          <Link href="/blog" mx={[2, 3]}>
            Blog
          </Link>
          <Link href="/code" mx={[2, 3]}>
            Code
          </Link>
          <Link href="/food" mx={[2, 3]}>
            Food
          </Link>
          <Link href="/projects" mx={[2, 3]}>
            Projects
          </Link>
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
