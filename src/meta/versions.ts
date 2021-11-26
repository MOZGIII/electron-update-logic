import { coerce } from "semver";
import { JsonInput } from "../util";
import { Release } from "./repo";

export const findLatestRelease = (
  releases: Array<JsonInput<Release>>
): Release | null => {
  if (releases.length === 0) {
    return null;
  }
  return releases.reduce((prev, curr) => {
    if (!curr) {
      return prev;
    }
    if (!prev) {
      return curr;
    }

    const prevSemver = coerce(prev.version);
    const currSemver = coerce(curr.version);

    if (!currSemver) {
      return prev;
    }
    if (!prevSemver) {
      return curr;
    }

    if (prevSemver.compare(currSemver) >= 0) {
      return prev;
    }

    return curr;
  }) as Release;
};

export const areVersionsEqual = (a: string, b: string) => {
  let sa = coerce(a);
  let sb = coerce(b);
  if (!sa || !sb) {
    return false;
  }
  return sa.compare(sb) == 0;
};
