import { Link } from "@components/Link";
import { useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Box, Flex, Heading, IconButton, Text, useColorMode } from "theme-ui";

export function Navbar({ sx, ...props }: React.ComponentProps<typeof Box>) {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === "dark";

  const handleColorChange = () =>
    setColorMode(colorMode === "light" ? "dark" : "light");

  useEffect(() => {
    const switchMode = (e) => {
      const isDarkMode = e.matches;
      isDarkMode ? setColorMode("dark") : setColorMode("light");
    };
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addListener(switchMode);
    return () => darkModeMediaQuery.removeEventListener("change", switchMode);
  }, [setColorMode]);

  return (
    <Box
      as="header"
      mx="auto"
      px={[2, 3]}
      sx={{
        height: ["3.5rem", "3.5rem", "5rem"],
        position: "relative",
        zIndex: 101,
        maxWidth: "48em",
        width: "100%",
        ...sx,
      }}
      {...props}
    >
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Link
          isActive={false}
          href="/"
          my={[2, 3]}
          sx={{
            "&:hover, :focus-within": {
              color: "primary",
            },
          }}
        >
          <Heading
            as="span"
            aria-hidden
            sx={{
              fontSize: [4, 5],
              fontWeight: "body",
              userSelect: "none",
              textAlign: "center",
            }}
          >
            Gia Thinh Nguyen
            <Text color="primary" sx={{ fontWeight: "bold", fontSize: [5] }}>
              .
            </Text>
          </Heading>
        </Link>
        <Box as="nav">
          <Flex as="ul" py={[2, 0]} sx={{ alignItems: "center" }}>
            <Box as="li">
              <IconButton bg="transparent" onClick={handleColorChange}>
                <DarkModeSwitch
                  moonColor="var(--theme-ui-colors-primary)"
                  sunColor="var(--theme-ui-colors-secondary)"
                  size={20}
                  checked={isDark}
                  onChange={handleColorChange}
                />
              </IconButton>
            </Box>
            <Box as="li">
              <Link href="/about" isActive mx={[2, 3]}>
                About
              </Link>
            </Box>
            <Box as="li">
              <Link href="/posts" isActive mx={[2, 3]}>
                Posts
              </Link>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
