import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Game from "../routes/game";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../api/api.config", () => ({
  BACKEND_ADDRESS: "http://localhost:8080",
}));

vi.mock("../data/lessonImages", () => ({
  wasteItems: [
    { name: "Bottle", type: "recycling", image: "bottle.png" },
    { name: "Apple Core", type: "compost", image: "apple.png" },
    { name: "Battery", type: "special", image: "battery.png" },
    { name: "Bag", type: "trash", image: "bag.png" },
  ],
  bins: [
    { type: "trash", name: "Trash", open: "trash-open.png", closed: "trash.png" },
    { type: "recycling", name: "Recycling", open: "rec-open.png", closed: "rec.png" },
    { type: "compost", name: "Compost", open: "comp-open.png", closed: "comp.png" },
    { type: "special", name: "Special", open: "spec-open.png", closed: "spec.png" },
  ],
}));

describe("Game", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "abc123");

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => [],
      } as Response)
    );
  });

  it("renders the arcade page", () => {
    render(<Game />);

    expect(screen.getByText("BIN-IT ARCADE")).toBeInTheDocument();
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    expect(screen.getByText("⏱ 60s")).toBeInTheDocument();
  });

  it("renders the bin labels", () => {
    render(<Game />);

    expect(screen.getByText("Trash")).toBeInTheDocument();
    expect(screen.getByText("Recycling")).toBeInTheDocument();
    expect(screen.getByText("Compost")).toBeInTheDocument();
    expect(screen.getByText("Special")).toBeInTheDocument();
  });
});