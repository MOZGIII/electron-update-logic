import * as repo from "./meta/repo";
import { ElectronFeedURLOptions, Logic } from "./AutoUpdater";
import { findMatchingPlatform } from "./meta/platforms";
import { areVersionsEqual, findLatestRelease } from "./meta/versions";
import resolveUrl from "./meta/resolveUrl";

export type MetaRepoProvider = {
  readonly getMeta: GetMeta;
  readonly baseUrl?: string;
};

export type GetMeta = () => Promise<repo.Metadata>;

export type FeedParams = Omit<ElectronFeedURLOptions, "url">;

class MetaRepo implements Logic {
  constructor(
    readonly provider: MetaRepoProvider,
    readonly feed: FeedParams,
    readonly currentVersion: string,
    readonly platform: string,
    readonly arch: string
  ) {}

  lastVersionFeed = async (): Promise<ElectronFeedURLOptions | null> => {
    const { releases } = await this.provider.getMeta();

    const latestRelease = findLatestRelease(releases);
    if (!latestRelease) {
      // No releases available.
      return null;
    }

    if (areVersionsEqual(this.currentVersion, latestRelease.version)) {
      // Already at the latest version, skip the update.
      return null;
    }

    const feed = findMatchingPlatform(
      latestRelease.feeds,
      this.platform,
      this.arch
    );
    if (!feed) {
      // No update for this platform.
      return null;
    }

    const url = resolveUrl(feed.url, this.provider.baseUrl);

    return {
      ...this.feed,
      url,
    };
  };
}

export default MetaRepo;
