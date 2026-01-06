import messageController from "./MessageController";

export class ExtensionWorker {
  #setMessageListener() {
    chrome.runtime.onMessage.addListener((...x) => {
      messageController.handleMessage(...x);
      return true;
    });
  }

  init() {
    this.#setMessageListener();
  }
}
