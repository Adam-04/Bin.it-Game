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


const imageMap: Record<string, string> = {};
wasteItems.forEach((item) => {
  const filename = item.image.split("/").pop()?.replace(".png", "") ?? "";
  const folder = item.type;
  imageMap[`${folder}/${filename}`] = item.image;
});

// CSRF helper
function getCsrfToken(): string {
  return (
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] ?? ""
  );
}

export default function Game() {
  const navigate = useNavigate();
  const isSubmitting = useRef(false);
  const [screenWidth, setScreenWidth] = useState(
  typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [currentItem, setCurrentItem] = useState<WasteItem>(
    wasteItems[Math.floor(Math.random() * wasteItems.length)]
  );
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const [itemPool, setItemPool] = useState<WasteItem[]>(wasteItems);

  // Touch drag state
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingTouch = useRef(false);

  // Fetch backend items
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BACKEND_ADDRESS}/waste/random/arcade`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { garbageType: string; path: string }[]) => {
        const mapped: WasteItem[] = data
          .map((item) => ({
            name: item.path
              .split("/")
              .pop()!
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (c) => c.toUpperCase())
              .trim(),
            type: item.garbageType,
            image: imageMap[item.path] ?? "",
          }))
          .filter((item) => item.image !== "");

        if (mapped.length > 0) {
          const shuffled = [...mapped].sort(() => Math.random() - 0.5);
          setItemPool(shuffled);
          setCurrentItem(shuffled[Math.floor(Math.random() * shuffled.length)]);
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

      const res = await fetch(`${BACKEND_ADDRESS}/game/arcade/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, score: finalScore }),
      });

      if (!res.ok) {
        console.error("Score submit failed:", await res.text());
        isSubmitting.current = false;
      }
    } catch (err) {
      console.error("Score submission error:", err);
      isSubmitting.current = false;
    }
  }

  function getNextItem() {
    const item = itemPool[Math.floor(Math.random() * itemPool.length)];
    setCurrentItem(item);
  }

  // Countdown timer
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setGameActive(false);
          submitScore(scoreRef.current).finally(() => {
            navigate("/score/arcade", { state: { score: scoreRef.current } });
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, navigate]);

  // Mouse drag handlers
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

  // Touch handlers
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

  // Scoring logic
  function resolveItem(binType: string) {
    if (currentItem.type === binType) {
      setScore((s) => {
        scoreRef.current = s + 10;
        return s + 10;
      });
      setFeedback("✅ Correct!");
    } else {
      setScore((s) => {
        scoreRef.current = Math.max(0, s - 5);
        return Math.max(0, s - 5);
      });
      setFeedback("❌ Wrong bin!");
    }

    setTimeout(() => {
      setFeedback("");
      getNextItem();
    }, 700);
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
          BIN-IT ARCADE
        </h1>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
          <h2 className="leaderboard-title">Score: {score}</h2>
          <h2 className="leaderboard-title">⏱ {timeLeft}s</h2>
        </div>

        {/* Active Waste Item */}
        <div
          draggable={gameActive}
          onDragStart={handleDragStart}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="auth-card"
          style={{
            margin: "0 auto 1.5rem",
            width: "40vw",
            height: "40vw",
            maxWidth: "180px",
            maxHeight: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            opacity: touchPos ? 0 : 1,
            transition: "opacity 0.1s",
            cursor: gameActive ? "grab" : "default",
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

        {/* Touch Ghost Image */}
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
              opacity: 0.85,
              zIndex: 9999,
            }}
          />
        )}

        {/* Feedback */}
        <div style={{ height: "40px", marginBottom: "1rem" }}>
          {feedback && (
            <p
              className="click-prompt"
              style={{
                color: feedback.includes("✅") ? "var(--accent-green)" : "var(--error-red)",
                opacity: 1,
              }}
            >
              {feedback}
            </p>
          )}
        </div>

        {/* Bins */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              screenWidth < 600 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "7%",
            width: "100%",
            maxWidth: screenWidth < 600 ? "360px" : "600px",
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
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                outline: hoveredBin === bin.type ? "2px solid var(--accent-teal)" : "none",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ width: "130px", height: "130px", overflow: "hidden" }}>
                <img
                  src={hoveredBin === bin.type ? bin.open : bin.closed}
                  alt={bin.name}
                  style={{ width: "130px", height: "130px", objectFit: "contain" }}
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
