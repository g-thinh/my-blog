import { Box, Flex, Text } from "theme-ui";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { Link } from "@components/index";

export function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        width: "100%",
      }}
    >
      <Box py={[2, 3]} bg="muted">
        <Flex
          py={2}
          sx={{
            width: "10rem",
            margin: "0 auto",
            justifyContent: "space-around",
          }}
        >
          <Link
            href="https://twitter.com/GThinhNguyen"
            target="_blank"
            noIcon
            sx={{ "&:hover": { color: "primary" } }}
          >
            <FiTwitter size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/gthinh-nguyen"
            target="_blank"
            noIcon
            sx={{ "&:hover": { color: "primary" } }}
          >
            <FiLinkedin size={20} />
          </Link>
          <Link
            href="https://github.com/g-thinh/"
            target="_blank"
            noIcon
            sx={{ "&:hover": { color: "primary" } }}
          >
            <FiGithub size={20} />
          </Link>
        </Flex>
        <Text
          as="p"
          color="grayness"
          sx={{
            fontSize: [0, 1],
            textAlign: "center",
          }}
        >
          © 2021 All rights probably deserved.
        </Text>
      </Box>
    </Box>
  );
}
