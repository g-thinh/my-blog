import { useState } from "react";
import { createCtx } from "@utils/createContext";

type AccordionContext = {
  expanded: number | false;
  setExpanded: React.Dispatch<React.SetStateAction<any>>;
};

export const [useAccordion, CtxProvider] = createCtx<AccordionContext>();

export function AccordionProvider({ children }: React.PropsWithChildren<{}>) {
  const [expanded, setExpanded] = useState<number | false>(false);

  return (
    <CtxProvider
      value={{
        expanded,
        setExpanded,
      }}
    >
      {children}
    </CtxProvider>
  );
}
