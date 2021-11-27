import * as repo from "./meta/repo";
import { ElectronFeedURLOptions, Logic } from "./AutoUpdater";
import { findMatchingPlatform } from "./meta/platforms";
import { areVersionsEqual, findLatestRelease } from "./meta/versions";

export type GetMeta = () => Promise<repo.Metadata>;

export type FeedParams = Omit<ElectronFeedURLOptions, "url">;

class MetaRepo implements Logic {
  constructor(
    readonly getMeta: GetMeta,
    readonly feed: FeedParams,
    readonly currentVersion: string,
    readonly platform: string
  ) {}

  lastVersionFeed = async (): Promise<ElectronFeedURLOptions | null> => {
    const { releases } = await this.getMeta();

    const latestRelease = findLatestRelease(releases);
    if (!latestRelease) {
      // No releases available.
      return null;
    }

    if (areVersionsEqual(this.currentVersion, latestRelease.version)) {
      // Already at the latest version, skip the update.
      return null;
    }

    const feed = findMatchingPlatform(latestRelease.feeds, this.platform);
    if (!feed) {
      // No update for this platform.
      return null;
    }

    return {
      ...this.feed,
      url: feed.url,
    };
  };
}

export default MetaRepo;
