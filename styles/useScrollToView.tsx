import { RefObject, useEffect } from "react";

export default function useScrollToView<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  condition?: boolean
) {
  useEffect(() => {
    const Node = ref.current;
    if (condition && ref && ref.current) {
      Node.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [ref, condition]);
}
