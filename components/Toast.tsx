import { useEffect, useRef } from "react";
import { Box, Text, Alert, Close } from "theme-ui";
import { useToast } from "@components/ToastContext";
import { AnimatePresence, motion } from "framer-motion";

const AlertBox = ({ toast }) => {
  const { state, dispatch } = useToast();
  const countdown = state.duration * toast.id;
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      dispatch({ type: "DELETE", id: toast.id });
    }, countdown);

    return () => {
      clearTimeout(timer.current);
    };
  }, [dispatch, toast.id, countdown]);

  return (
    <motion.div
      key={toast.id}
      initial={{ opacity: 0, scale: 0, y: "100%" }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Alert
        bg="highlight"
        mt={3}
        sx={{
          width: "fit-content",
          boxShadow: "card",
        }}
        onMouseEnter={() => clearTimeout(timer.current)}
        onMouseLeave={() =>
          setTimeout(
            () => dispatch({ type: "DELETE", id: toast.id }),
            state.duration
          )
        }
      >
        <Text as="p" pr={4}>
          {toast.text}
        </Text>
        <Close
          ml="auto"
          mr={-2}
          p={0}
          onClick={() => {
            dispatch({ type: "DELETE", id: toast.id });
          }}
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "primary",
              backgroundColor: "muted",
            },
          }}
        />
      </Alert>
    </motion.div>
  );
};

export const Toast = () => {
  const { state } = useToast();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <AnimatePresence>
        {state.list.map((toast) => {
          return <AlertBox key={toast.id} toast={toast} />;
        })}
      </AnimatePresence>
    </Box>
  );
};
