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
      console.log(window.pageYOffset);
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
      <span>Bring me up please ☝️</span>
    </Button>
  );
}
