import { Box, Text, Alert, Close, useThemeUI } from "theme-ui";
import { useToast } from "@components/ToastContext";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useCallback } from "react";
import type { Positions } from "./ToastContext";
import { FiInfo } from "react-icons/fi";
import { darken } from "@theme-ui/color";
import { Motion } from "@components/Motion";

const AlertBox = ({ toast }) => {
  const { theme } = useThemeUI();
  const { dispatch, state } = useToast();
  const timer = useRef(null);

  const handleDeleteToast = useCallback(
    () => dispatch({ type: "DELETE", id: toast.id }),
    [dispatch, toast.id]
  );

  useEffect(() => {
    timer.current = setTimeout(handleDeleteToast, state.duration);
    return () => clearTimeout(timer.current);
  }, [handleDeleteToast, state.duration]);

  return (
    <Motion.Box
      key={toast.id}
      initial={{ opacity: 0, scale: 0.3, y: "100%" }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Alert
        bg="accent"
        mt={3}
        sx={{
          position: "relative",
          width: "fit-content",
          boxShadow: "lg",
        }}
      >
        <FiInfo size={24} color={theme.colors.background as string} />
        <Text as="p" ml={2} pr={4} color="background">
          {toast.text}
        </Text>
        <Close
          ml="auto"
          mr={-2}
          p={0}
          onClick={handleDeleteToast}
          sx={{
            cursor: "pointer",
            color: "background",
            "&:hover": {
              color: "background",
              backgroundColor: darken("accent", 0.05),
            },
          }}
        />
      </Alert>
    </Motion.Box>
  );
};

function computePositionStyles(position: Positions) {
  switch (position) {
    case "top": {
      return {
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
      };
    }
    case "top-left": {
      return {
        top: "1rem",
        left: "1rem",
      };
    }
    case "top-right": {
      return {
        top: "1rem",
        right: "1rem",
      };
    }
    case "bottom": {
      return {
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
      };
    }
    case "bottom-left": {
      return {
        bottom: "1rem",
        left: "1rem",
      };
    }
    case "bottom-right": {
      return {
        bottom: "1rem",
        right: "1rem",
      };
    }
    default: {
      break;
    }
  }
}

export const Toast = () => {
  const { state } = useToast();
  const positionStyles = computePositionStyles(state.position);

  return (
    <Box
      sx={{
        ...positionStyles,
        position: "fixed",
        zIndex: 101,
        isolation: "isolate",
      }}
    >
      <AnimatePresence initial={false}>
        {state.list.map((toast) => {
          return <AlertBox key={toast.id} toast={toast} />;
        })}
      </AnimatePresence>
    </Box>
  );
};
