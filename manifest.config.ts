import pkg from "./package.json";
import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: "public/logo.png",
  },
  action: {
    default_icon: {
      48: "public/logo.png",
    },
    default_popup: "src/views/popup/index.html",
  },
  content_scripts: [
    {
      js: ["src/views/content/main.ts"],
      matches: ["https://*/*"],
    },
  ],
  permissions: ["sidePanel", "contentSettings"],
  side_panel: {
    default_path: "src/views/sidepanel/index.html",
  },
  background: {
    service_worker: "src/views/background/main.ts",
    type: "module",
  },
});
