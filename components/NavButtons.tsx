import { Flex, Link, Button, useColorMode } from "theme-ui";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { FiGithub } from "react-icons/fi";

const NavButtons: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const isDark = colorMode === "dark";

  function handleColorChange() {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }

  return (
    <Flex
      sx={{
        justifyContent: ["center", "space-between"],
        alignItems: "center",
      }}
    >
      <Link
        href="https://github.com/g-thinh/"
        target="_blank"
        px={2}
        sx={{
          textDecoration: "none",
          color: "text",
          "&:hover": {
            color: "primary",
          },
          "&:focus": {
            color: "primary",
          },
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
          }}
        >
          <FiGithub size={24} />
        </Flex>
      </Link>
      <Flex px={2} sx={{ justifyContent: "center", alignContent: "center" }}>
        <Button bg="transparent" p={0} px={1} onClick={handleColorChange}>
          <DarkModeSwitch
            style={{
              marginTop: "6px",
            }}
            moonColor="var(--theme-ui-colors-primary)"
            sunColor="var(--theme-ui-colors-primary)"
            checked={isDark}
            onChange={handleColorChange}
          />
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavButtons;
