import { SnackbarCTXKey } from "@/contexts/SnackbarContext";
import { provide, ref, InjectionKey, UnwrapRef } from "vue";

type GetInnerType<S> = S extends InjectionKey<infer T> ? T : never;

type Notifications = UnwrapRef<
  GetInnerType<typeof SnackbarCTXKey>["notifications"]
>;

export const useSnackbarProvider = () => {
  const notificationList = ref<Notifications>([]);

  const notify = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const id = Date.now();

    notificationList.value.push({ message, type, id });

    setTimeout(() => {
      notificationList.value = notificationList.value.filter(
        (n) => n.id !== id
      );
    }, 3000);
  };

  provide(SnackbarCTXKey, {
    actions: {
      notify,
    },
    notifications: notificationList,
  });

  return { notificationList, notify };
};
