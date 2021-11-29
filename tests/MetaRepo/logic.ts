import { MockServer } from "jest-mock-server";
import MetaRepo from "../../src/MetaRepo";
import makeAxios from "../../src/getMeta/makeAxios";
import samples from "../fixtures/meta";

describe("Logic", () => {
  const server = new MockServer();

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  beforeEach(() => server.reset());

  it("finds an update if it's present", async () => {
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 200;
      ctx.body = samples["simple"];
    });

    const metaRepo = new MetaRepo(
      makeAxios({ url: server.getURL().toString() }),
      {},
      "0.1.0",
      "win32",
      "x64"
    );

    const feed = await metaRepo.lastVersionFeed();
    expect(feed).toEqual({ url: "http://exmaple.com/app/0.1.1/win32/x64" });

    expect(route).toHaveBeenCalledTimes(1);
  });

  it("ignores an update if the version matches", async () => {
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 200;
      ctx.body = samples["simple"];
    });

    const metaRepo = new MetaRepo(
      makeAxios({ url: server.getURL().toString() }),
      {},
      "0.1.1",
      "win32",
      "x64"
    );

    const feed = await metaRepo.lastVersionFeed();
    expect(feed).toBeNull();

    expect(route).toHaveBeenCalledTimes(1);
  });

  it("doesn't crash if there are no releases", async () => {
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 200;
      ctx.body = samples["noReleases"];
    });

    const metaRepo = new MetaRepo(
      makeAxios({ url: server.getURL().toString() }),
      {},
      "0.1.0",
      "win32",
      "x64"
    );

    const feed = await metaRepo.lastVersionFeed();
    expect(feed).toBeNull();

    expect(route).toHaveBeenCalledTimes(1);
  });

  it("handles non-trivial cases", async () => {
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 200;
      ctx.body = samples["advanced"];
    });

    const metaRepo = new MetaRepo(
      makeAxios({ url: server.getURL().toString() }),
      {},
      "0.1.2",
      "win32",
      "x64"
    );

    const feed = await metaRepo.lastVersionFeed();
    expect(feed).toEqual({ url: "http://exmaple.com/app/0.2.0/win32/x64" });

    expect(route).toHaveBeenCalledTimes(1);
  });
});
