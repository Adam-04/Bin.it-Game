import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "../routes/LoginPage";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

vi.mock("../api/api.auth", () => ({
  authApi: {
    login: (...args: unknown[]) => mockLogin(...args),
  },
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("logs in and navigates on success", async () => {
    mockLogin.mockResolvedValue({ token: "abc", userId: "123" });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "josh" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "pass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "LOG IN" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("josh", "pass123");
      expect(localStorage.getItem("token")).toBe("abc");
      expect(localStorage.getItem("userId")).toBe("123");
      expect(mockNavigate).toHaveBeenCalledWith("/homepage");
    });
  });

  it("shows error on failed login", async () => {
    mockLogin.mockRejectedValue(new Error("bad login"));

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "josh" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: "LOG IN" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid username or password.")).toBeInTheDocument();
    });
  });
});