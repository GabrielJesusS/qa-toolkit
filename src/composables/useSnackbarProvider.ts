import { SnackbarCTXKey } from "@/contexts/SnackbarContext";
import { provide, ref, InjectionKey, UnwrapRef, Component } from "vue";

type GetInnerType<S> = S extends InjectionKey<infer T> ? T : never;

type Notifications = UnwrapRef<
  GetInnerType<typeof SnackbarCTXKey>["notifications"]
>;

export const useSnackbarProvider = () => {
  const notificationList = ref<Notifications>([]);

  const notify = (
    message: string | Component,
    type: "success" | "error" | "info" | "warning" = "info",
    duration: number = 3000
  ) => {
    const id = Date.now();

    notificationList.value.push({ message, type, id });

    setTimeout(() => {
      notificationList.value = notificationList.value.filter(
        (n) => n.id !== id
      );
    }, duration);
  };

  provide(SnackbarCTXKey, {
    actions: {
      notify,
    },
    notifications: notificationList,
  });

  return { notificationList, notify };
};
