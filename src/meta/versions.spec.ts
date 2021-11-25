import { Release } from "./repo";
import { findLatestRelease } from "./versions";

const mk = (version: string): Release => ({ version, feeds: [] });

describe("findLatestRelease", () => {
  it("handles no releases properly", () => {
    expect(findLatestRelease([])).toBeNull();
  });

  it("handles a single release properly", () => {
    const sample = { version: "1", feeds: [] };
    expect(findLatestRelease([sample])).toBe(sample);
  });

  it("handles a single release with invalid version", () => {
    const sample = { version: "", feeds: [] };
    expect(findLatestRelease([sample])).toBe(sample);
  });

  it("handles a single release with invalid version (2)", () => {
    const sample = { version: "hello", feeds: [] };
    expect(findLatestRelease([sample])).toBe(sample);
  });

  it("handles two releases with same versions as intended", () => {
    const a = { version: "1", feeds: [] };
    const b = { version: "1", feeds: [] };
    const result = findLatestRelease([a, b]);
    expect(result).toBe(a);
    expect(result).not.toBe(b);
  });

  it("finds the latest release", () => {
    const list = [mk("1"), mk("3"), mk("2")];
    expect(findLatestRelease(list)).toBe(list[1]);
  });

  it("finds the latest release with some real-world scenario", () => {
    const list = [
      mk("0.1.0"),
      mk("1.0.0"),
      mk("1.0.1"),
      mk("1.0.2"),
      mk("1.2.0"),
      mk("1.2.1"),
    ];
    expect(findLatestRelease(list)).toBe(list[5]);
  });

  it("works with betas", () => {
    const list = [mk("0.1.0"), mk("2.0.0-beta")];
    expect(findLatestRelease(list)).toBe(list[1]);
  });

  it("knows release is newer than beta", () => {
    const list = [mk("2.0.0"), mk("2.0.0-beta")];
    expect(findLatestRelease(list)).toBe(list[0]);
  });

  it("finds the latest release with some real-world scenario with betas", () => {
    const list = [
      mk("0.1.0"),
      mk("1.0.0"),
      mk("1.0.1"),
      mk("1.0.2"),
      mk("1.2.0"),
      mk("1.2.1"),
      mk("2.0.0-beta"),
    ];
    expect(findLatestRelease(list)).toBe(list[6]);
  });

  it("prefers valid version", () => {
    const list = [mk("hello"), mk("0.1.0"), mk("world")];
    expect(findLatestRelease(list)).toBe(list[1]);
  });
});
