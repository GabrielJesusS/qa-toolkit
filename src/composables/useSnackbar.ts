import { SnackbarCTXKey } from "@/contexts/SnackbarContext";
import { inject } from "vue";

export const useSnackbar = () => {
  const snackbar = inject(SnackbarCTXKey);

  if (!snackbar) {
    throw new Error("useSnackbar must be used within a useSnackbarProvider");
  }

  return {
    notify: snackbar.actions.notify,
    notifications: snackbar.notifications,
  };
};
