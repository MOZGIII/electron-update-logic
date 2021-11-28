import { repo } from "../../src";

const mkurl = (version: string, platform: string, arch: string) =>
  `http://exmaple.com/app/${version}/${platform}/${arch}`;

const mkfeed = (version: string, platform: string, arch: string) => ({
  platform,
  arch,
  url: mkurl(version, platform, arch),
});

const mkrelease = (version: string, platforms: string[], arch: string) => ({
  version,
  feeds: platforms.map((platform) => mkfeed(version, platform, arch)),
});

const asSamples = <T extends { [K in keyof T]: repo.Metadata }>(val: T): T =>
  val;

const samples = asSamples({
  noReleases: {
    releases: [],
  },
  simple: {
    releases: [mkrelease("0.1.1", ["darwin", "win32"], "x64")],
  },
  advanced: {
    releases: [
      mkrelease("0.2.0", ["darwin", "win32"], "x64"),
      mkrelease("0.1.2", ["darwin", "win32"], "x64"),
      mkrelease("0.1.1", ["darwin", "win32"], "x64"),
      mkrelease("0.1.0", ["darwin", "win32"], "x64"),
    ],
  },
});

export default samples;
