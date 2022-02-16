import { createCtx } from "@utils/createContext";
import dynamic from "next/dynamic";
import React from "react";

const LazyToast = dynamic(()=> import("../components/Toast"), {ssr: false})

export type Positions =
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left";

type ToastItem = {
  id: number;
  text: string;
  position?: Positions;
};

type DispatchAction = {
  type: string;
  id?: number;
  text?: string;
  position?: Positions;
  duration?: number;
};

type InitialState = {
  list: ToastItem[];
  position: Positions;
  duration: number;
};

type ToastContextState = {
  state: InitialState;
  dispatch: React.Dispatch<DispatchAction>;
};

export const [useToast, CtxProvider] = createCtx<ToastContextState>();

const initialState: InitialState = {
  list: [],
  position: "bottom",
  duration: 5000,
};

function reducer(state = initialState, action: DispatchAction) {
  switch (action.type) {
    case "ADD": {
      const newToast = {
        id: state.list.length + 1,
        text: action.text,
      };
      return {
        ...state,
        list: [...state.list, newToast],
        position: action.position ?? "bottom",
        duration: action.duration ?? 5000,
      };
    }

    case "DELETE": {
      const { id } = action;
      const updatedIndex = state.list.findIndex((item) => id === item.id);
      const newList = state.list;
      newList.splice(updatedIndex, 1);
      return {
        ...state,
        list: newList,
      };
    }

    default:
      throw new Error();
  }
}

export const ToastProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CtxProvider value={{ state, dispatch }}>
      {children}
      <LazyToast />
    </CtxProvider>
  );
};
