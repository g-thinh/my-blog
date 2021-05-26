import React, { createContext, useContext, useReducer } from "react";
import { Toast } from "@components/Toast";

interface ProviderProps {
  children: React.ReactNode;
}

interface ToastItem {
  id: number;
  text: string;
}

type DispatchAction = {
  type: string;
  id?: number;
  text?: string;
};

interface InitialState {
  list: ToastItem[];
  duration: number;
}

interface Context {
  state: InitialState;
  dispatch: React.Dispatch<DispatchAction>;
}

const ToastContext = createContext({} as Context);

const initialState: InitialState = {
  list: [],
  duration: 3000,
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

export const ToastProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
