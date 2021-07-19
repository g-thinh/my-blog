import { PropsWithChildren, useState, Dispatch, SetStateAction } from "react";
import { Variants } from "framer-motion";

import { createCtx } from "@utils/createContext";

type DropdownContextState = {
  isOpen: boolean;
  onTransitionEnd: Dispatch<SetStateAction<boolean>>;
  dropdownAnimation: typeof dropdownAnimation;
};

const dropdownAnimation: Variants = {
  enter: {
    visibility: "visible",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    transitionEnd: {
      visibility: "hidden",
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: "easeOut",
    },
  },
};

export const [useDropdown, CtxProvider] = createCtx<DropdownContextState>();

export function DropdownProvider({ children }: PropsWithChildren<{}>) {
  const [isOpen, onTransitionEnd] = useState(false);

  return (
    <CtxProvider
      value={{
        isOpen,
        onTransitionEnd,
        dropdownAnimation,
      }}
    >
      {children}
    </CtxProvider>
  );
}
