import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import WelcomePage from "../routes/WelcomePage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("WelcomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders welcome text", () => {
    render(<WelcomePage />);
    expect(screen.getByText("WELCOME TO BIN-IT")).toBeInTheDocument();
    expect(screen.getByText("CLICK ANYWHERE TO START")).toBeInTheDocument();
  });

  it("navigates to login when page is clicked", () => {
    const { container } = render(<WelcomePage />);
    fireEvent.click(container.firstChild as HTMLElement);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});