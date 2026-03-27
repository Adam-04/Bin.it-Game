import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { authApi } from "../api/api.auth";

describe("authApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("login sends POST request with username and password", async () => {
    const mockResponse = { token: "abc123", userId: "1" };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const result = await authApi.login("josh", "password123");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "josh", password: "password123" }),
    });

    expect(result).toEqual(mockResponse);
  });

  it("login throws error when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(authApi.login("josh", "wrongpass")).rejects.toThrow(
      "Invalid username or password"
    );
  });

  it("register sends POST request with username, email, and password", async () => {
    const mockResponse = { message: "Registered successfully" };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const result = await authApi.register(
      "josh",
      "josh@email.com",
      "password123"
    );

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "josh",
        email: "josh@email.com",
        password: "password123",
      }),
    });

    expect(result).toEqual(mockResponse);
  });

  it("register throws error when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(
      authApi.register("josh", "josh@email.com", "badpass")
    ).rejects.toThrow("Registration failed");
  });
});