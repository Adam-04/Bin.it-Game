import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LessonsHome from "../routes/LessonsHome";

const mockNavigate = vi.fn();
const mockGetAllLessons = vi.fn();
const mockGetCompletedLessons = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../api/api.lessons", () => ({
  lessonApi: {
    getAllLessons: (...args: unknown[]) => mockGetAllLessons(...args),
    getCompletedLessons: (...args: unknown[]) => mockGetCompletedLessons(...args),
  },
}));

vi.mock("../images/lessonsComplete.png", () => ({
  default: "badge.png",
}));

describe("LessonsHome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("redirects to login if no userId", () => {
    render(<LessonsHome />);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shows lessons after loading", async () => {
    localStorage.setItem("userId", "123");

    mockGetAllLessons.mockResolvedValue([
      { id: "1", title: "Test", description: "", lessonOrder: 1 },
      { id: "2", title: "Recycling", description: "", lessonOrder: 2 },
    ]);
    mockGetCompletedLessons.mockResolvedValue([{ lessonId: "2", completed: true }]);

    render(<LessonsHome />);

    await waitFor(() => {
      expect(screen.getByText("LESSON CENTER")).toBeInTheDocument();
      expect(screen.getByText("RECYCLING")).toBeInTheDocument();
      expect(screen.getByText("100%")).toBeInTheDocument();
    });
  });

  it("navigates to homepage when HOMEPAGE is clicked", async () => {
    localStorage.setItem("userId", "123");

    mockGetAllLessons.mockResolvedValue([]);
    mockGetCompletedLessons.mockResolvedValue([]);

    render(<LessonsHome />);

    await waitFor(() => {
      expect(screen.getByText("LESSON CENTER")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HOMEPAGE"));
    expect(mockNavigate).toHaveBeenCalledWith("/homepage");
  });
});