import { RefObject, useEffect } from "react";

export default function useScrollToView<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  condition?: boolean
) {
  useEffect(() => {
    const Node = ref.current;
    if (condition) {
      const NodeDomRect = Node.getBoundingClientRect();
      window.scrollTo(0, NodeDomRect.height);
    }
  }, [ref, condition]);
}
