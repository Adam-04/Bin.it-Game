import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ScorePage from "../routes/ScorePage";

const mockNavigate = vi.fn();
const mockGetLeaderboard = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ mode: "arcade" }),
}));

vi.mock("../api/api.score", () => ({
  scoreApi: {
    getLeaderboard: (...args: unknown[]) => mockGetLeaderboard(...args),
  },
}));

describe("ScorePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("userId", "2");
  });

  it("renders leaderboard entries", async () => {
    mockGetLeaderboard.mockResolvedValue([
      { userId: "1", username: "alice", score: 50 },
      { userId: "2", username: "josh", score: 80 },
      { userId: "2", username: "josh", score: 70 },
    ]);

    render(<ScorePage />);

    await waitFor(() => {
      expect(screen.getByText("ARCADE LEADERBOARD")).toBeInTheDocument();
      expect(screen.getByText("JOSH")).toBeInTheDocument();
      expect(screen.getByText("ALICE")).toBeInTheDocument();
    });
  });

  it("shows error if leaderboard load fails", async () => {
    mockGetLeaderboard.mockRejectedValue(new Error("fail"));

    render(<ScorePage />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load leaderboard.")).toBeInTheDocument();
    });
  });

  it("navigates home when HOMEPAGE is clicked", async () => {
    mockGetLeaderboard.mockResolvedValue([]);

    render(<ScorePage />);

    await waitFor(() => {
      expect(screen.getByText("ARCADE LEADERBOARD")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HOMEPAGE"));
    expect(mockNavigate).toHaveBeenCalledWith("/homepage");
  });
});