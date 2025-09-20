// __tests__/urls/deleteUrl.test.ts
import { deleteUrl } from "@/server/actions/urls/delete-url";

// Mock auth
jest.mock("@/server/auth", () => ({
  auth: jest.fn(),
}));

// Mock db + schema
jest.mock("@/server/db", () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
  },
  eq: jest.fn(),
}));

jest.mock("@/server/db/schema", () => ({
  urls: { id: "id", userId: "userId" },
}));

import { auth } from "@/server/auth";
import { db } from "@/server/db";

describe("deleteUrl", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return unauthorized if no session", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await deleteUrl(1);

    // Assert
    expect(result).toEqual({
      success: false,
      error: "Unauthorized",
    });
  });

  it("should return error if URL not found", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        where: () => [],
      }),
    });

    // Act
    const result = await deleteUrl(1);

    // Assert
    expect(result).toEqual({
      success: false,
      error: "URL not found",
    });
  });

  it("should return unauthorized if URL belongs to another user", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        where: () => [{ id: 1, userId: "456" }],
      }),
    });

    // Act
    const result = await deleteUrl(1);

    // Assert
    expect(result).toEqual({
      success: false,
      error: "Unauthorized",
    });
  });

  it("should delete URL successfully for owner", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        where: () => [{ id: 1, userId: "123" }],
      }),
    });
    (db.delete as jest.Mock).mockReturnValueOnce({
      where: jest.fn(),
    });

    // Act
    const result = await deleteUrl(1);

    // Assert
    expect(result).toEqual({
      success: true,
      data: null,
    });
  });
  it("should handle unexpected errors gracefully", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        where: () => [{ id: 1, userId: "123" }],
      }),
    });

    // Force db.delete to throw
    (db.delete as jest.Mock).mockImplementationOnce(() => {
      throw new Error("DB failure");
    });

    // Act
    const result = await deleteUrl(1);

    // Assert
    expect(result).toEqual({
      success: false,
      error: "An error occurred",
    });
  });
});
