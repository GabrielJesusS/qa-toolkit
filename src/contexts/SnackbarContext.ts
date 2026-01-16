import type { Component, InjectionKey, Ref } from "vue";

type Notification = {
  type: "success" | "error" | "info" | "warning";
  message: string | Component;
  id: number;
};

type SnackbarActions = {
  notify: (
    message: Notification["message"],
    type: Notification["type"],
    duration?: number
  ) => void;
};

export interface SnackbarContext {
  actions: SnackbarActions;
  notifications: Ref<Notification[]>;
}

export const SnackbarCTXKey: InjectionKey<SnackbarContext> =
  Symbol("snackbar-context");
