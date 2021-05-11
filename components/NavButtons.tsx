import { useEffect } from "react";
import { Flex, Link, useColorMode, IconButton } from "theme-ui";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiGithub, FiTwitter, FiLinkedin, FiLink } from "react-icons/fi";

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
    <Flex
      sx={{
        justifyContent: ["center", "space-between"],
        alignItems: "center",
      }}
    >
      <Link href="https://twitter.com/GThinhNguyen" target="_blank" px={2}>
        <IconButton tabIndex={-1} variant="navButton">
          <FiTwitter size={18} />
        </IconButton>
      </Link>
      <Link href="https://linkedin.com/in/gthinh-nguyen" target="_blank" px={2}>
        <IconButton tabIndex={-1} variant="navButton">
          <FiLinkedin size={18} />
        </IconButton>
      </Link>
      <Link href="https://github.com/g-thinh/" target="_blank" px={2}>
        <IconButton tabIndex={-1} variant="navButton">
          <FiGithub size={18} />
        </IconButton>
      </Link>
      <Flex px={2} sx={{ justifyContent: "center", alignContent: "center" }}>
        <IconButton bg="transparent" p={0} px={1} onClick={handleColorChange}>
          <DarkModeSwitch
            moonColor="var(--theme-ui-colors-primary)"
            sunColor="var(--theme-ui-colors-primary)"
            size={18}
            checked={isDark}
            onChange={handleColorChange}
          />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default NavButtons;
