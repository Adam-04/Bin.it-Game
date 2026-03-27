import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RegisterPage from "../routes/RegisterPage";

const mockNavigate = vi.fn();
const mockRegister = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

vi.mock("../api/api.auth", () => ({
  authApi: {
    register: (...args: unknown[]) => mockRegister(...args),
  },
}));

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders register form", () => {
    render(<RegisterPage />);
    expect(screen.getByText("REGISTER YOUR ACCOUNT")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
  });

  it("shows validation error when emails do not match", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "josh" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email address"), {
      target: { value: "a@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your email address"), {
      target: { value: "b@test.com" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[0], {
      target: { value: "pass123" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[1], {
      target: { value: "pass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "JOIN NOW" }));

    await waitFor(() => {
      expect(
        screen.getByText("Email Address and Confirm Email Address do not match.")
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("registers and navigates on success", async () => {
    mockRegister.mockResolvedValue({});

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "josh" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email address"), {
      target: { value: "a@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your email address"), {
      target: { value: "a@test.com" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[0], {
      target: { value: "pass123" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("••••••••")[1], {
      target: { value: "pass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "JOIN NOW" }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("josh", "a@test.com", "pass123");
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});