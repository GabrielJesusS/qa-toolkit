import { AppConfigSchema } from "@/schemas/settings/app-config";
import { StorageKeyEnum } from "./enums/StorageKeyEnum";
import messageController from "./MessageController";
import { StorageController } from "./StorageController";
import { TrackInfo } from "./types/TrackInfo";

const Track = new Map<string, TrackInfo>();

const LIMIT = 50;

export class ExtensionWorker {
  static getTrackedRequests() {
    return Array.from(Track.values());
  }

  #setMessageListener() {
    chrome.runtime.onMessage.addListener((...x) => {
      messageController.handleMessage(...x);
      return true;
    });
  }

  #setRequestListener() {
    chrome.webRequest.onCompleted.addListener(
      async (details) => {
        if (!details.url.startsWith("http")) return;

        const appConfig = await StorageController.get(
          StorageKeyEnum.APP_CONFIG,
          AppConfigSchema
        );

        if (!appConfig.sendNetwork || !appConfig.urlTrack) return;

        const tabs = await chrome.tabs.query({ active: true });

        if (!tabs || tabs.length === 0) return;

        const activeTab = tabs[0];

        if (details.tabId !== activeTab?.id) return;

        if (details.initiator?.includes(appConfig.urlTrack)) {
          Track.set(details.requestId, {
            url: details.url,
            createdAt: Date.now(),
            origin: details.initiator || "unknown",
            code: details.statusCode.toString(),
          });

          if (Track.size > LIMIT) {
            const oldestKey = Array.from(Track.entries()).reduce((a, b) =>
              a[1].createdAt < b[1].createdAt ? a : b
            )[0];
            Track.delete(oldestKey);
          }
        }
      },
      {
        urls: ["<all_urls>"],
      }
    );
  }

  init() {
    this.#setRequestListener();
    this.#setMessageListener();
  }
}
