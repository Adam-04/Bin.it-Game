import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../app.css";

import { BACKEND_ADDRESS } from "../api/api.config";

import { wasteItems, bins } from "../data/lessonImages";

type WasteItem = {
  name: string;
  type: string;
  image: string;
};

const ROUND_SIZE = 10;


const imageMap: Record<string, string> = {};
wasteItems.forEach((item) => {
  const lastSeg = item.image.split("/").pop()?.replace(".png", "") ?? "";
  const folder =
    item.type === "trash"
      ? "trash"
      : item.type === "recycling"
      ? "recycling"
      : item.type === "compost"
      ? "compost"
      : "special";

  imageMap[`${folder}/${lastSeg}`] = item.image;
});

export default function Apply() {
  const navigate = useNavigate();

  const [queue, setQueue] = useState<WasteItem[]>(() =>
    [...wasteItems].sort(() => Math.random() - 0.5).slice(0, ROUND_SIZE)
  );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameActive, setGameActive] = useState(true);
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingTouch = useRef(false);
  const isSubmitting = useRef(false);

  const currentItem = queue[index];

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BACKEND_ADDRESS}/waste/random/apply`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { garbageType: string; path: string }[]) => {
        const mapped: WasteItem[] = data
          .map((item) => ({
            name: item.path.split("/").pop()!
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (c) => c.toUpperCase())
              .trim(),
            type: item.garbageType,
            image: imageMap[item.path] ?? "",
          }))
          .filter((item) => item.image !== "");

        if (mapped.length > 0) {
          const shuffled = [...mapped].sort(() => Math.random() - 0.5).slice(0, ROUND_SIZE);
          setQueue(shuffled);
          setIndex(0);
        }
      })
      .catch((err) => console.warn("Using local fallback items:", err));
  }, []);

  async function submitScore(finalScore: number): Promise<void> {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (isSubmitting.current || !userId || !token) return;

    try {
      isSubmitting.current = true;
      const res = await fetch(`${BACKEND_ADDRESS}/game/apply/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, score: finalScore }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Score submit failed:", text);
        isSubmitting.current = false;
      }
    } catch (err) {
      console.error("Score submission error:", err);
      isSubmitting.current = false;
    }
  }

  function resolveItem(binType: string) {
    if (!gameActive) return;

    let newScore = score;
    if (currentItem.type === binType) {
      newScore = score + 10;
      setScore(newScore);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Wrong bin!");
    }

    const nextIndex = index + 1;

    setTimeout(() => {
      setFeedback("");
      if (nextIndex >= ROUND_SIZE) {
        setGameActive(false);
        submitScore(newScore);
      } else {
        setIndex(nextIndex);
      }
    }, 700);
  }

  function handleRetry() {
    const newQueue = [...wasteItems].sort(() => Math.random() - 0.5).slice(0, ROUND_SIZE);
    setQueue(newQueue);
    setIndex(0);
    setScore(0);
    setFeedback("");
    setGameActive(true);
    isSubmitting.current = false;
  }

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("type", currentItem.type);
  }

  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent, binType: string) {
    e.preventDefault();
    if (!gameActive) return;
    setHoveredBin(null);
    resolveItem(binType);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (!gameActive) return;
    isDraggingTouch.current = true;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDraggingTouch.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const binEl = el?.closest("[data-bin-type]");
    setHoveredBin(binEl?.getAttribute("data-bin-type") ?? null);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!isDraggingTouch.current) return;
    isDraggingTouch.current = false;
    setTouchPos(null);
    setHoveredBin(null);
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const binEl = el?.closest("[data-bin-type]");
    const binType = binEl?.getAttribute("data-bin-type");
    if (binType) resolveItem(binType);
  }

  if (!gameActive) {
    return (
      <div className="page-container">
        <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />
        <div className="nebula-container">
          <div className="blob blob-yellow"></div>
          <div className="blob blob-teal"></div>
        </div>
        <main className="welcome-layout" style={{ zIndex: 10, textAlign: "center" }}>
          <h1 className="auth-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Round Complete!
          </h1>
          <p className="leaderboard-title" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Score: {score} / {ROUND_SIZE * 10}
          </p>
          <p style={{ color: "var(--text-dim)", marginBottom: "2rem" }}>
            You sorted {score / 10} out of {ROUND_SIZE} items correctly.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
            <button className="action-button" onClick={handleRetry}>
              TRY AGAIN
            </button>
            <button className="action-button" onClick={() => navigate("/homepage")}>
              HOME
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      <main className="welcome-layout" style={{ zIndex: 10 }}>
        <h1 className="auth-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          BIN-IT APPLY
        </h1>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", alignItems: "center" }}>
          <h2 className="leaderboard-title" style={{ margin: 0 }}>Score: {score}</h2>
          <h2 className="leaderboard-title" style={{ margin: 0 }}>Item: {index + 1}/{ROUND_SIZE}</h2>
        </div>

        <div
          draggable={gameActive}
          onDragStart={handleDragStart}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="auth-card"
          style={{
            margin: "0 auto 1.5rem",
            width: "30vw",
            height: "30vw",
            maxWidth: "150px",
            maxHeight: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "60px",
            cursor: gameActive ? "grab" : "default",
            opacity: touchPos ? 0 : 1,
            transition: "opacity 0.1s",
            touchAction: "none",
          }}
        >
          <img
            src={currentItem.image}
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
            alt={currentItem.name}
          />
          <div style={{ fontSize: "1rem", color: "var(--text-dim)", marginTop: "10px", fontWeight: "bold" }}>
            {currentItem.name}
          </div>
        </div>

        {touchPos && (
          <img
            src={currentItem.image}
            alt={currentItem.name}
            style={{
              position: "fixed",
              left: touchPos.x - 45,
              top: touchPos.y - 45,
              width: "90px",
              height: "90px",
              objectFit: "contain",
              pointerEvents: "none",
              zIndex: 9999,
              opacity: 0.85,
            }}
          />
        )}

        <div style={{ height: "40px", marginBottom: "1rem" }}>
          {feedback && (
            <p className="click-prompt" style={{
              color: feedback.includes("✅") ? "var(--accent-green)" : "var(--error-red)",
              textShadow: "none",
              opacity: 1
            }}>
              {feedback}
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 600 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "7%",
            width: "100%",
            maxWidth: window.innerWidth < 600 ? "360px" : "600px",
            margin: "0 auto",
            justifyContent: "center",
            boxSizing: "border-box",
            padding: "0 16px",
          }}
        >
          {bins.map((bin) => (
            <div
              key={bin.type}
              data-bin-type={bin.type}
              onDrop={(e) => handleDrop(e, bin.type)}
              onDragOver={(e) => {
                allowDrop(e);
                setHoveredBin(bin.type);
              }}
              onDragLeave={() => setHoveredBin(null)}
              className="auth-card"
              style={{
                height: window.innerWidth < 600 ? "120px" : "180px",
                minHeight: window.innerWidth < 600 ? "110px" : "140px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.2s ease",
                cursor: "pointer",
                outline: hoveredBin === bin.type ? "2px solid var(--accent-teal)" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ width: "130px", height: "130px", flexShrink: 0, overflow: "hidden" }}>
                <img
                  src={hoveredBin === bin.type ? bin.open : bin.closed}
                  alt={bin.name}
                  style={{ width: "130px", height: "130px", objectFit: "contain", display: "block" }}
                />
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginTop: "5px",
                }}
              >
                {bin.name}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
