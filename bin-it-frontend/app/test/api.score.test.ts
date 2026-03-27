import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { scoreApi } from "../api/api.score";

describe("scoreApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("fetch", vi.fn());
    localStorage.clear();
    localStorage.setItem("token", "score-token");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("getLeaderboard fetches leaderboard with default limit of 10", async () => {
    const mockLeaderboard = [
      { rank: 1, userId: "1", username: "Josh", score: 100 },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockLeaderboard),
    } as unknown as Response);

    const result = await scoreApi.getLeaderboard();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/leaderboard?limit=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer score-token",
        },
      }
    );

    expect(result).toEqual(mockLeaderboard);
  });

  it("getLeaderboard fetches leaderboard with custom limit", async () => {
    const mockLeaderboard = [
      { rank: 1, userId: "1", username: "Josh", score: 100 },
      { rank: 2, userId: "2", username: "Amy", score: 95 },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockLeaderboard),
    } as unknown as Response);

    const result = await scoreApi.getLeaderboard(5);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/leaderboard?limit=5",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer score-token",
        },
      }
    );

    expect(result).toEqual(mockLeaderboard);
  });

  it("getLeaderboard throws error when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(scoreApi.getLeaderboard()).rejects.toThrow(
      "Failed to fetch leaderboard"
    );
  });
});