import "@/views/background/handlers/_index";
import { ExtensionWorker } from "@/core/ExtensionWorker";

const extensionWorker = new ExtensionWorker();

extensionWorker.init();
