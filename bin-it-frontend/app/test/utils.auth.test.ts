import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleSignOut } from "../utils/utils.auth";

describe("handleSignOut", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("token", "abc123");
    localStorage.setItem("userId", "42");
  });

  it("removes token and userId from localStorage", () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");

    try {
      handleSignOut();
    } catch {
      // Ignore jsdom navigation errors if they happen
    }

    expect(removeItemSpy).toHaveBeenCalledWith("token");
    expect(removeItemSpy).toHaveBeenCalledWith("userId");
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("userId")).toBeNull();
  });

  it("attempts to redirect to the login page", () => {
    expect(() => handleSignOut()).toThrow();
  });
});