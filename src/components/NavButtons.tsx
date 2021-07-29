import { Flex, Link, IconButton } from "theme-ui";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export function NavButtons() {
  return (
    <Flex sx={{ width: "100%", justifyContent: "center" }}>
      <Link href="https://twitter.com/GThinhNguyen" target="_blank" px={2}>
        <IconButton tabIndex={-1} variant="navButton">
          <FiTwitter size={20} />
        </IconButton>
      </Link>
      <Link href="https://linkedin.com/in/gthinh-nguyen" target="_blank" px={2}>
        <IconButton tabIndex={-1} variant="navButton">
          <FiLinkedin size={20} />
        </IconButton>
      </Link>
      <Link href="https://github.com/g-thinh/" target="_blank" px={2}>
        <IconButton tabIndex={-1} variant="navButton">
          <FiGithub size={20} />
        </IconButton>
      </Link>
    </Flex>
  );
}

export default NavButtons;
