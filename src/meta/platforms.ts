import { ArchName, PlatfomName } from "./repo";

interface PlatformSpecific {
  platform: PlatfomName;
  arch: ArchName;
}

export const findMatchingPlatform = <T extends PlatformSpecific>(
  items: Array<T>,
  platform: PlatfomName,
  arch: ArchName
): T | null =>
  items.find((item) => item.platform === platform && item.arch === arch) ||
  null;
