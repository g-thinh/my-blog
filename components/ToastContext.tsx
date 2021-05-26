import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from "react";
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
  timer: React.MutableRefObject<NodeJS.Timeout>;
  autoClearToasts: () => void;
}

const ToastContext = createContext({} as Context);

const initialState: InitialState = { list: [], duration: 3000 };

function reducer(state = initialState, action: DispatchAction) {
  switch (action.type) {
    case "ADD": {
      const newToast = {
        id: state.list.length + 1,
        text: action.text,
      };
      return { ...state, list: [...state.list, newToast] };
    }

    case "DELETE": {
      const { id } = action;
      const updatedIndex = state.list.findIndex((item) => id === item.id);
      const newList = state.list;
      newList.splice(updatedIndex, 1);
      return { ...state, list: newList };
    }

    default:
      throw new Error();
  }
}

export const ToastProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const autoClearToasts = useCallback(() => {
    if (!state.list[0]) return;
    const firstToastId = state.list[0].id;
    dispatch({ type: "DELETE", id: firstToastId });
  }, [state.list, dispatch]);

  useEffect(() => {
    if (state.list.length > 0) {
      timer.current = setTimeout(autoClearToasts, state.duration);
    }
    return () => clearTimeout(timer.current);
  }, [state, autoClearToasts]);

  return (
    <ToastContext.Provider value={{ state, dispatch, timer, autoClearToasts }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
