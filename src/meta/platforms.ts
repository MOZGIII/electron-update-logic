import { PlatfomName } from "./repo";

interface PlatformSpecific {
  platform: PlatfomName;
}

export const findMatchingPlatform = <T extends PlatformSpecific>(
  items: Array<T>,
  platform: PlatfomName
): T | null => items.find((item) => item.platform === platform) || null;
