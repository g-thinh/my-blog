import { Flex, Box, Text } from "theme-ui";
import { Navbar, NavButtons } from "@components/index";
import Head from "next/head";
import { useColorMode } from "theme-ui";
import { PropsWithChildren } from "react";
import { useState, useEffect, useCallback } from "react";

export function Layout({ children }: PropsWithChildren<{}>) {
  const [scrolled, setScrolled] = useState(false);
  const [colorMode] = useColorMode();
  const isDark = colorMode === "dark";

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll, scrolled]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.ico" />
        <meta name="theme-color" content={`${isDark ? "#222639" : "#fff"}`} />
      </Head>
      <Flex
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Navbar />
        </Box>
        <Box
          as="main"
          mt={[3, 4]}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "48em",
              mx: "auto",
              px: 0,
            }}
          >
            {children}
          </Box>
        </Box>
        <Box
          as="footer"
          sx={{
            width: "100%",
          }}
        >
          <Box py={[2, 3]} bg="muted">
            <Box>
              <NavButtons />
            </Box>
            <Text
              as="p"
              sx={{
                fontSize: [0, 1],
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
}
