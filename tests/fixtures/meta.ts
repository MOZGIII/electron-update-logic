import { repo } from "../../src";

const mkurl = (version: string, platform: string) =>
  `http://exmaple.com/app/${version}/${platform}`;

const mkfeed = (version: string, platform: string) => ({
  platform,
  url: mkurl(version, platform),
});

const mkrelease = (version: string, platforms: string[]) => ({
  version,
  feeds: platforms.map((platform) => mkfeed(version, platform)),
});

const asSamples = <T extends { [K in keyof T]: repo.Metadata }>(val: T): T =>
  val;

const samples = asSamples({
  noReleases: {
    releases: [],
  },
  simple: {
    releases: [mkrelease("0.1.1", ["darwin", "win32"])],
  },
  advanced: {
    releases: [
      mkrelease("0.2.0", ["darwin", "win32"]),
      mkrelease("0.1.2", ["darwin", "win32"]),
      mkrelease("0.1.1", ["darwin", "win32"]),
      mkrelease("0.1.0", ["darwin", "win32"]),
    ],
  },
});

export default samples;
