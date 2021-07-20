import { PropsWithChildren, useState, Dispatch, SetStateAction } from "react";
import { createCtx } from "@utils/createContext";

type TabsContext = {
  activeTab: any;
  setActiveTab: Dispatch<SetStateAction<any>>;
};

export const [useTabs, CtxProvider] = createCtx<TabsContext>();

export function TabsProvider({ children }: PropsWithChildren<{}>) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <CtxProvider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </CtxProvider>
  );
}
