import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { lessonApi } from "../api/api.lessons";

describe("lessonApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("fetch", vi.fn());
    localStorage.clear();
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("getAllLessons fetches all lessons with auth headers", async () => {
    const mockLessons = [{ id: "1", title: "Lesson 1" }];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockLessons),
    } as unknown as Response);

    const result = await lessonApi.getAllLessons();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/lessons", {
      headers: {
        Authorization: "Bearer test-token",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    expect(result).toEqual(mockLessons);
  });

  it("getAllLessons throws error when fetch fails", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(lessonApi.getAllLessons()).rejects.toThrow(
      "Failed to fetch lessons"
    );
  });

  it("getUserProgress fetches user progress with auth headers", async () => {
    const mockProgress = [{ lessonId: "1", completed: true }];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProgress),
    } as unknown as Response);

    const result = await lessonApi.getUserProgress("42");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/progress/42", {
      headers: {
        Authorization: "Bearer test-token",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    expect(result).toEqual(mockProgress);
  });

  it("getUserProgress throws error when fetch fails", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(lessonApi.getUserProgress("42")).rejects.toThrow(
      "Failed to fetch progress"
    );
  });

  it("markComplete sends POST request with auth headers", async () => {
    const mockResponse = { success: true };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const result = await lessonApi.markComplete("42", "7");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/progress/42/complete/7",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("markComplete throws error when fetch fails", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(lessonApi.markComplete("42", "7")).rejects.toThrow(
      "Failed to update database"
    );
  });
});