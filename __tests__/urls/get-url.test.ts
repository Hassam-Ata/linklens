import { getUrlByShortCode } from "@/server/actions/urls/get-url";
import { db } from "@/server/db";

// Mock the database
jest.mock("@/server/db", () => ({
  db: {
    query: {
      urls: {
        findFirst: jest.fn(),
      },
    },
    update: jest.fn(() => ({
      set: jest.fn(() => ({
        where: jest.fn(),
      })),
    })),
  },
  eq: jest.fn(),
}));

const mockDb = db as any;

describe("getUrlByShortCode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return URL data when found", async () => {
    // Arrange
    const mockUrl = {
      shortCode: "abc123",
      originalUrl: "https://example.com",
      clicks: 5,
      flagged: false,
      flagReason: null,
    };
    mockDb.query.urls.findFirst.mockResolvedValue(mockUrl);

    // Act
    const result = await getUrlByShortCode("abc123");

    // Assert
    expect(result.success).toBe(true);
    expect(result.data?.originalUrl).toBe("https://example.com");
    expect(result.data?.flagged).toBe(false);
  });

  it("should return flagged URL data", async () => {
    // Arrange
    const mockUrl = {
      shortCode: "bad123",
      originalUrl: "https://bad-site.com",
      clicks: 2,
      flagged: true,
      flagReason: "Suspicious content",
    };
    mockDb.query.urls.findFirst.mockResolvedValue(mockUrl);

    // Act
    const result = await getUrlByShortCode("bad123");

    // Assert
    expect(result.success).toBe(true);
    expect(result.data?.flagged).toBe(true);
    expect(result.data?.flagReason).toBe("Suspicious content");
  });

  it("should return error when URL not found", async () => {
    // Arrange
    mockDb.query.urls.findFirst.mockResolvedValue(null);

    // Act
    const result = await getUrlByShortCode("notfound");

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe("URL not found");
  });

  it("should return error when database throws", async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockDb.query.urls.findFirst.mockRejectedValue(new Error("DB Error"));

    // Act
    const result = await getUrlByShortCode("error");

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe("An error occurred while fetching the URL");
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should increment clicks when URL is found", async () => {
    // Arrange
    const mockUrl = {
      shortCode: "click123",
      originalUrl: "https://example.com",
      clicks: 10,
      flagged: false,
      flagReason: null,
    };
    const mockSet = jest.fn().mockReturnValue({ where: jest.fn() });
    mockDb.update.mockReturnValue({ set: mockSet });
    mockDb.query.urls.findFirst.mockResolvedValue(mockUrl);

    // Act
    await getUrlByShortCode("click123");

    // Assert
    expect(mockDb.update).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith({
      clicks: 11,
      updatedAt: expect.any(Date),
    });
  });
});
