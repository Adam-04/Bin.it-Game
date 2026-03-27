import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Apply from "../routes/apply";

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
    { name: "Can", type: "recycling", image: "can.png" },
    { name: "Paper", type: "recycling", image: "paper.png" },
    { name: "Apple Core", type: "compost", image: "apple.png" },
    { name: "Battery", type: "special", image: "battery.png" },
    { name: "Bag", type: "trash", image: "bag.png" },
    { name: "Box", type: "recycling", image: "box.png" },
    { name: "Cup", type: "trash", image: "cup.png" },
    { name: "Jar", type: "recycling", image: "jar.png" },
    { name: "Leaf", type: "compost", image: "leaf.png" },
  ],
  bins: [
    { type: "trash", name: "Trash", open: "trash-open.png", closed: "trash.png" },
    { type: "recycling", name: "Recycling", open: "rec-open.png", closed: "rec.png" },
    { type: "compost", name: "Compost", open: "comp-open.png", closed: "comp.png" },
    { type: "special", name: "Special", open: "spec-open.png", closed: "spec.png" },
  ],
}));

describe("Apply", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "abc");
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );
  });

  it("renders apply page basics", () => {
    render(<Apply />);
    expect(screen.getByText("BIN-IT APPLY")).toBeInTheDocument();
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
    expect(screen.getByText(/Item:/)).toBeInTheDocument();
  });
});