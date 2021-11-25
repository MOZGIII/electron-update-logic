export type Metadata = {
  readonly releases: Array<Release>;
};

export type Release = {
  readonly version: string;
  readonly feeds: Array<Feed>;
};

export type PlatfomName = NodeJS.Platform | string;

export type Feed = {
  readonly platform: PlatfomName;
  readonly url: string;
};
