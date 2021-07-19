import { Flex, Box, Text } from "theme-ui";
import { Navbar, NavButtons, ScrollButton } from "@components/index";
import Head from "next/head";
import { useColorMode } from "theme-ui";

const Layout: React.FC = (props) => {
  const [colorMode] = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <>
      <Head>
        <link rel="icon" href={`${isDark ? "/dark.png" : "/light.png"}`} />
        <meta name="theme-color" content={`${isDark ? "#222639" : "#fff"}`} />
      </Head>
      <Flex
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 100 }}>
          <Navbar />
        </Box>
        <Box
          as="main"
          sx={{
            marginTop: [2, 4],
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "43em",
              mx: "auto",
              px: 0,
            }}
          >
            {props.children}
          </Box>
        </Box>
        <Flex my={[2, 3]} sx={{ justifyContent: "center" }}>
          <ScrollButton />
        </Flex>
        <Box
          as="footer"
          sx={{
            width: "100%",
          }}
        >
          <Box py={[2, 3]} bg="muted">
            <Box
              sx={{
                display: ["block", "none"],
              }}
            >
              <NavButtons />
            </Box>
            <Text
              as="p"
              sx={{
                fontSize: 0,
                filter: "brightness(75%)",
                textAlign: "center",
              }}
            >
              © 2021 All rights probably deserved.
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
