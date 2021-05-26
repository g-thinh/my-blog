import { Box, Text, Alert, Close } from "theme-ui";
import { useToast } from "@components/ToastContext";
import { AnimatePresence, motion } from "framer-motion";

export const Toast = () => {
  const { state, timer, autoClearToasts, dispatch } = useToast();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
      }}
      onMouseEnter={() => clearTimeout(timer.current)}
      onMouseLeave={() => setTimeout(autoClearToasts, 1000)}
    >
      <AnimatePresence>
        {state.list.map((toast) => {
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, scale: 0, x: "-100%" }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Alert
                bg="highlight"
                mt={3}
                sx={{
                  boxShadow: "card",
                }}
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
        })}
      </AnimatePresence>
    </Box>
  );
};
