import { useState } from "react";
import { createCtx } from "@utils/createContext";

type MenuContextState = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentFocus: number;
  setCurrentFocus: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
};

export const [useMenu, CtxProvider] = createCtx<MenuContextState>();

export function MenuProvider({ children }: React.PropsWithChildren<{}>) {
  const [isOpen, setOpen] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [size, setSize] = useState(0);

  return (
    <CtxProvider
      value={{
        isOpen,
        setOpen,
        currentFocus,
        setCurrentFocus,
        size,
        setSize,
      }}
    >
      {children}
    </CtxProvider>
  );
}
