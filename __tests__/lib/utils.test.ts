import { cn, ensureHttps, isValidUrl } from "@/lib/utils";

describe("utils", () => {
  test("cn merges class names correctly", () => {
    const result = cn("bg-red-500", "text-white", false && "hidden");
    expect(result).toContain("bg-red-500");
    expect(result).toContain("text-white");
    expect(result).not.toContain("hidden");
  });

  test("isValidUrl returns true for valid http/https urls", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
    expect(isValidUrl("https://example.com")).toBe(true);
  });

  test("isValidUrl returns false for invalid urls", () => {
    expect(isValidUrl("not-a-url")).toBe(false);
    expect(isValidUrl("ftp://example.com")).toBe(false);
  });

  test("ensureHttps adds https if missing", () => {
    expect(ensureHttps("example.com")).toBe("https://example.com");
  });

  test("ensureHttps replaces http with https", () => {
    expect(ensureHttps("http://example.com")).toBe("https://example.com");
  });

  test("ensureHttps keeps https as is", () => {
    expect(ensureHttps("https://secure.com")).toBe("https://secure.com");
  });
});
