import "@/views/background/handlers/_index";
import { ExtensionClient } from "@/core/ExtensionClient";

const extensionClient = new ExtensionClient();

extensionClient.init();

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  await chrome.sidePanel.open({
    tabId: tab.id,
  });
});
