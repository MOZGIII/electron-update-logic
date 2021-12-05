import resolveUrl from "./resolveUrl";

describe("resolveUrl", () => {
  it("passes through the URL when it's absolute without a base", () => {
    expect(resolveUrl("scheme://")).toBe("scheme://");

    expect(resolveUrl("https://exmaple.com")).toBe("https://exmaple.com/");
    expect(resolveUrl("https://exmaple.com/")).toBe("https://exmaple.com/");
    expect(resolveUrl("https://exmaple.com/qwe")).toBe(
      "https://exmaple.com/qwe"
    );
    expect(resolveUrl("https://exmaple.com/qwe?qwe=rty")).toBe(
      "https://exmaple.com/qwe?qwe=rty"
    );

    expect(resolveUrl("file:/my/path")).toBe("file:///my/path");
  });

  it("passes through the URL when it's absolute and a base URL is set", () => {
    expect(resolveUrl("scheme://", "https://mybase.exmaple.com")).toBe(
      "scheme://"
    );

    expect(
      resolveUrl("https://exmaple.com", "https://mybase.exmaple.com")
    ).toBe("https://exmaple.com/");
    expect(
      resolveUrl("https://exmaple.com/", "https://mybase.exmaple.com")
    ).toBe("https://exmaple.com/");
    expect(
      resolveUrl("https://exmaple.com/qwe", "https://mybase.exmaple.com")
    ).toBe("https://exmaple.com/qwe");
    expect(
      resolveUrl(
        "https://exmaple.com/qwe?qwe=rty",
        "https://mybase.exmaple.com"
      )
    ).toBe("https://exmaple.com/qwe?qwe=rty");

    expect(resolveUrl("file:/my/path", "https://mybase.exmaple.com")).toBe(
      "file:///my/path"
    );
  });

  it("handles relative URL correctly a base URL is proided", () => {
    expect(resolveUrl("", "scheme://")).toBe("scheme://");
    expect(resolveUrl("", "scheme:/")).toBe("scheme:/");

    expect(resolveUrl("", "https://exmaple.com")).toBe("https://exmaple.com/");
    expect(resolveUrl("/", "https://exmaple.com")).toBe("https://exmaple.com/");
    expect(resolveUrl("qwe", "https://exmaple.com")).toBe(
      "https://exmaple.com/qwe"
    );
    expect(resolveUrl("/qwe", "https://exmaple.com")).toBe(
      "https://exmaple.com/qwe"
    );

    expect(resolveUrl("", "https://exmaple.com/")).toBe("https://exmaple.com/");
    expect(resolveUrl("rty", "https://exmaple.com/qwe")).toBe(
      "https://exmaple.com/rty"
    );
    expect(resolveUrl("rty", "https://exmaple.com/qwe?qwe=rty")).toBe(
      "https://exmaple.com/rty"
    );

    expect(resolveUrl("qwe?qwe=rty", "https://exmaple.com")).toBe(
      "https://exmaple.com/qwe?qwe=rty"
    );
  });

  it("crashes on relative URL with no base URL", () => {
    expect(() => {
      resolveUrl("");
    }).toThrowError();

    expect(() => {
      resolveUrl("/");
    }).toThrowError();

    expect(() => {
      resolveUrl("/qwe");
    }).toThrowError();
  });

  it("crashes on invalid URL concatenation", () => {
    expect(() => {
      resolveUrl("", "scheme:");
    }).toThrowError();
    expect(() => {
      resolveUrl("/", "scheme:");
    }).toThrowError();
    expect(() => {
      resolveUrl("qwe", "scheme:");
    }).toThrowError();
    expect(() => {
      resolveUrl("/qwe", "scheme:");
    }).toThrowError();
  });
});
