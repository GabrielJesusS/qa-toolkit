import type { InjectionKey, Ref } from "vue";

type Notification = {
  type: "success" | "error" | "info";
  message: string;
  id: number;
};

type SnackbarActions = {
  notify: (message: string, type: "success" | "error" | "info") => void;
};

export interface SnackbarContext {
  actions: SnackbarActions;
  notifications: Ref<Notification[]>;
}

export const SnackbarCTXKey: InjectionKey<SnackbarContext> =
  Symbol("snackbar-context");
