import { useEffect } from "react";
import { Box, Flex, Link, useColorMode, IconButton } from "theme-ui";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const NavButtons: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const isDark = colorMode === "dark";

  function handleColorChange() {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }

  useEffect(() => {
    const switchMode = (e) => {
      const isDarkMode = e.matches;
      isDarkMode ? setColorMode("dark") : setColorMode("light");
    };
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addListener(switchMode);
    // cleanup on unmount
    return () => darkModeMediaQuery.removeEventListener("change", switchMode);
  }, [setColorMode]);

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
      <Box px={2}>
        <IconButton bg="transparent" onClick={handleColorChange}>
          <DarkModeSwitch
            moonColor="var(--theme-ui-colors-primary)"
            sunColor="var(--theme-ui-colors-primary)"
            size={20}
            checked={isDark}
            onChange={handleColorChange}
          />
        </IconButton>
      </Box>
    </Flex>
  );
};

export default NavButtons;
