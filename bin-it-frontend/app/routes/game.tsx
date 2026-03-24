import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../app.css"; 

type WasteItem = {
  name: string;
  type: string;
  emoji?: string;
  image?: string;
};

const wasteItems: WasteItem[] = [
  { name: "Plastic Bottle", type: "recycling", emoji: "🍾" },
  { name: "Banana Peel", type: "compost", emoji: "🍌" },
  { name: "Battery", type: "special", emoji: "🔋" },
  { name: "Paper", type: "recycling", emoji: "📄" },
  { name: "Apple Core", type: "compost", emoji: "🍎" },
  { name: "Styrofoam", type: "trash", emoji: "📦" },
  { name: "Glass Bottle", type: "recycling", emoji: "🍶" },
  { name: "Paint Can", type: "special", emoji: "🎨" },
];

const bins = [
  { type: "trash", name: "Trash", emoji: "🗑️" },
  { type: "recycling", name: "Recycling", emoji: "♻️" },
  { type: "compost", name: "Compost", emoji: "🌱" },
  { type: "special", name: "Hazardous", emoji: "☣️" },
];

export default function Game() {
  const navigate = useNavigate();

  const [currentItem, setCurrentItem] = useState<WasteItem>(
    wasteItems[Math.floor(Math.random() * wasteItems.length)]
  );

  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);

  function getNextItem() {
    const item = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    setCurrentItem(item);
  }

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setGameActive(false);

          setTimeout(() => {
            // Navigates to ScorePage with the final score
            navigate("/score/arcade", { state: { score } }); 
          }, 500);

          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score, navigate]);

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("type", currentItem.type);
  }

  function allowDrop(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent, binType: string) {
    e.preventDefault();
    if (!gameActive) return;

    const itemType = e.dataTransfer.getData("type");

    if (itemType === binType) {
      setScore((s) => s + 10);
      setFeedback("✅ Correct!");
    } else {
      setScore((s) => Math.max(0, s - 5));
      setFeedback("❌ Wrong bin!");
    }

    setTimeout(() => {
      setFeedback("");
      getNextItem();
    }, 700);
  }

  return (
    <div className="page-container">
      {/* GLOBAL LOGO */}
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      {/* AESTHETIC BACKGROUND BLOBS */}
      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      <main className="welcome-layout" style={{ zIndex: 10 }}>
        <h1 className="auth-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          BIN.IT GAME
        </h1>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
          <h2 className="leaderboard-title" style={{ margin: 0 }}>Score: {score}</h2>
          <h2 className="leaderboard-title" style={{ margin: 0 }}>⏱ {timeLeft}s</h2>
        </div>

        {/* ACTIVE WASTE ITEM CARD */}
        <div
          draggable={gameActive}
          onDragStart={handleDragStart}
          className="auth-card"
          style={{
            margin: "0 auto 1.5rem",
            width: "180px",
            height: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "60px",
            cursor: gameActive ? "grab" : "default",
            border: "2px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          {currentItem.image ? (
            <img src={currentItem.image} style={{ width: "90px" }} alt={currentItem.name} />
          ) : (
            <div>{currentItem.emoji}</div>
          )}
          <div style={{ fontSize: "1rem", color: "var(--text-dim)", marginTop: "10px", fontWeight: "bold" }}>
            {currentItem.name}
          </div>
        </div>

        {/* FEEDBACK PROMPT */}
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

        {/* WASTE BINS GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 160px)",
          gap: "20px",
          justifyContent: "center"
        }}>
          {bins.map((bin) => (
            <div
              key={bin.type}
              onDrop={(e) => handleDrop(e, bin.type)}
              onDragOver={allowDrop}
              className="auth-card"
              style={{
                height: "140px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "45px",
                border: "2px dashed var(--accent-teal)",
                transition: "transform 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div>{bin.emoji}</div>
              <div style={{ 
                fontSize: "0.8rem", 
                color: "var(--text-dim)", 
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginTop: "5px"
              }}>
                {bin.name}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}