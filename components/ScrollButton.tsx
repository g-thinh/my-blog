import { useState, useEffect } from "react";
import { Button } from "theme-ui";

export default function ScrollButton(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Button
      variant="scrollToTop"
      onClick={scrollToTop}
      sx={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      <span>Go up ☝️</span>
    </Button>
  );
}
