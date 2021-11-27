import {
  autoUpdater as electronAutoUpdater,
  AutoUpdater as ElectronAutoUpdater,
} from "electron";
import EventEmitter from "events";

export type ElectronFeedURLOptions = Electron.FeedURLOptions;

export interface Logic {
  lastVersionFeed: () => Promise<ElectronFeedURLOptions | null>;
}

const mappedEmits = [
  "before-quit-for-update",
  "checking-for-update",
  "error",
  "update-available",
  "update-downloaded",
  "update-not-available",
] as const;

class AutoUpdater extends EventEmitter {
  private isFeedSet: boolean = false;

  constructor(
    readonly logic: Logic,
    readonly inner: ElectronAutoUpdater = electronAutoUpdater
  ) {
    super();

    const mapEmit = <T extends typeof mappedEmits[any]>(mappedEmit: T) => {
      const f = (...args: any[]) => this.emit(mappedEmit, ...args);
      this.inner.on(mappedEmit as any, f);
    };
    mappedEmits.forEach(mapEmit);
  }

  private prepareFeed = async () => {
    let feed;
    try {
      feed = await this.logic.lastVersionFeed();
    } catch (err) {
      this.isFeedSet = false;
      this.emit("error", err);
      return;
    }

    if (!feed) {
      this.isFeedSet = false;
      return;
    }
    this.inner.setFeedURL(feed);
    this.isFeedSet = true;
    return;
  };

  checkForUpdates = async (): Promise<void> => {
    await this.prepareFeed();
    if (!this.isFeedSet) {
      return;
    }
    this.inner.checkForUpdates();
  };

  quitAndInstall = async (): Promise<void> => {
    if (!this.isFeedSet) {
      return;
    }
    this.inner.quitAndInstall();
  };
}

export default AutoUpdater;
