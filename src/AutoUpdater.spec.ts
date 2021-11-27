import AutoUpdater, { ElectronFeedURLOptions, Logic } from "./AutoUpdater";

const makeMockClass = (methods: string[]) =>
  methods.reduce((obj, method) => ({ ...obj, [method]: jest.fn() }), {});

const clearMockClass = async (obj: any) => {
  for (const key in obj) {
    await obj[key].mockClear();
  }
};

describe("AutoUpdater", () => {
  const lastVersionFeed = jest.fn<Promise<ElectronFeedURLOptions | null>, []>();
  const mockLogic: Logic = { lastVersionFeed };
  beforeEach(() => lastVersionFeed.mockClear());

  let mockAutoUpdater: any & Record<string, jest.Mock>;
  beforeEach(() => {
    mockAutoUpdater = makeMockClass([
      "on",
      "setFeedURL",
      "checkForUpdates",
      "quitAndInstall",
    ]);
  });
  afterEach(() => clearMockClass(mockAutoUpdater));

  it("maps events from the inner autoupdater", async () => {
    new AutoUpdater(mockLogic, mockAutoUpdater);
    expect(mockAutoUpdater.on).toHaveBeenCalledTimes(6);
  });

  it("runs the update if there's a feed", async () => {
    const updater = new AutoUpdater(mockLogic, mockAutoUpdater);
    lastVersionFeed.mockResolvedValue({ url: "http://example.com" });

    await updater.checkForUpdates();

    expect(mockAutoUpdater.setFeedURL).toHaveBeenCalledWith({
      url: "http://example.com",
    });

    expect(mockAutoUpdater.checkForUpdates).toHaveBeenCalled();

    await updater.quitAndInstall();

    expect(mockAutoUpdater.quitAndInstall).toHaveBeenCalled();
  });
});
