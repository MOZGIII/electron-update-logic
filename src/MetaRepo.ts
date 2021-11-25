import { ElectronFeedURLOptions, Logic } from "./AutoUpdater";
import handleMetaResponse from "./meta/handleMetaResponse";
import makeMetaRequest from "./meta/makeMetaRequest";
import { findMatchingPlatform } from "./meta/platforms";
import { areVersionsEqual, findLatestRelease } from "./meta/versions";

export type FeedParams = Omit<ElectronFeedURLOptions, "url">;

export type MetaParams = {
  readonly url: string;
  readonly headers: Headers;
};

export type Fetch = (
  input: RequestInfo,
  init: RequestInit
) => Promise<Response>;

class MetaRepo implements Logic {
  constructor(
    readonly meta: MetaParams,
    readonly feed: FeedParams,
    readonly currentVersion: string,
    readonly platform: string,
    readonly fetch: Fetch = self.fetch
  ) {}

  lastVersionFeed = async (): Promise<ElectronFeedURLOptions | null> => {
    const [info, init] = makeMetaRequest(this.meta.url, this.meta.headers);
    const res = await this.fetch(info, init);
    const meta = await handleMetaResponse(res);

    const latestRelease = findLatestRelease(meta.releases);
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
