import { MockServer } from "jest-mock-server";
import MetaRepo from "../../src/MetaRepo";
import makeAxios from "../../src/getMeta/makeAxios";

describe("Transport - axios", () => {
  const server = new MockServer();

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  beforeEach(() => server.reset());

  it("throws on bad status as expected", async () => {
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 500;
    });

    const metaRepo = new MetaRepo(
      makeAxios({ url: server.getURL().toString() }),
      {},
      "0.1.0",
      "win32"
    );

    await expect(async () => {
      await metaRepo.lastVersionFeed();
    }).rejects.toThrowError("Request failed with status code 500");

    expect(route).toHaveBeenCalledTimes(1);
  });

  it("reacts to an invalid response body as expected", async () => {
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 200;
      ctx.body = "<html></html>";
    });

    const metaRepo = new MetaRepo(
      makeAxios({ url: server.getURL().toString() }),
      {},
      "0.1.0",
      "win32"
    );

    const feed = await metaRepo.lastVersionFeed();
    expect(feed).toBeNull();

    expect(route).toHaveBeenCalledTimes(1);
  });

  it("reacts to an empty response body as expected", async () => {
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 200;
      ctx.body = "";
    });

    const metaRepo = new MetaRepo(
      makeAxios({ url: server.getURL().toString() }),
      {},
      "0.1.0",
      "win32"
    );

    const feed = await metaRepo.lastVersionFeed();
    expect(feed).toBeNull();

    expect(route).toHaveBeenCalledTimes(1);
  });
});
