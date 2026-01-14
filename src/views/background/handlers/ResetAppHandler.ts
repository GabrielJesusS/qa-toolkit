import { StorageController } from "@/core/StorageController";

export async function ResetAppHandler() {
  await StorageController.clear();
}
