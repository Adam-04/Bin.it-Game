import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "../routes/HomePage";

const mockNavigate = vi.fn();
const mockHandleSignOut = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../utils/utils.auth", () => ({
  handleSignOut: mockHandleSignOut,
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders main buttons", () => {
    render(<HomePage />);

    expect(screen.getByText("BIN-IT")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LEARN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "APPLY" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ARCADE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LEADERBOARD" })).toBeInTheDocument();
  });

  it("navigates to lessons when LEARN is clicked", () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole("button", { name: "LEARN" }));
    expect(mockNavigate).toHaveBeenCalledWith("/lessons");
  });

  it("calls sign out when Sign Out is clicked", () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText("Sign Out"));
    expect(mockHandleSignOut).toHaveBeenCalled();
  });
});