import { findLatestRelease } from "./versions";

describe("findLatestRelease", () => {
  it("handles no releases properly", () => {
    expect(findLatestRelease([])).toBeNull();
  });
});
