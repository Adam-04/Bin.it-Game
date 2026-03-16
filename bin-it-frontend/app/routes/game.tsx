import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../app.css";

type WasteItem = {
  name: string;
  type: string;
  emoji: string;
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
  { name: "Food Scraps", type: "compost", emoji: "🥗" },
  { name: "Aluminum Can", type: "recycling", emoji: "🥫" },
  { name: "Light Bulb", type: "special", emoji: "💡" },
  { name: "Plastic Bag", type: "trash", emoji: "🛍️" },
];

const bins = [
  { type: "trash", name: "Trash", emoji: "🗑️" },
  { type: "recycling", name: "Recycling", emoji: "♻️" },
  { type: "compost", name: "Compost", emoji: "🌱" },
  { type: "special", name: "Hazardous", emoji: "☣️" },
];

export default function Game() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [score, setScore] = useState(0);
  const [itemsSorted, setItemsSorted] = useState(0);
  const [correctSorts, setCorrectSorts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState("");

  function getRandomItem() {
    const item = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    setCurrentItem(item);
  }

  function startGame(selectedMode: string) {
    setMode(selectedMode);
    setGameActive(true);
    setScore(0);
    setItemsSorted(0);
    setCorrectSorts(0);
    setFeedback("");

    if (selectedMode === "arcade") {
      setTimeLeft(60);
    }

    getRandomItem();
  }

  useEffect(() => {
    if (mode === "arcade" && gameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && mode === "arcade") {
      endGame();
    }
  }, [timeLeft, gameActive]);

  function handleSort(binType: string) {
    if (!currentItem) return;

    const correct = currentItem.type === binType;

    if (correct) {
      setScore((s) => s + 10);
      setCorrectSorts((c) => c + 1);
      setFeedback("✅ Correct!");
    } else {
      setScore((s) => Math.max(0, s - 5));
      setFeedback(`❌ Wrong! Goes in ${currentItem.type}`);
    }

    setItemsSorted((i) => i + 1);

    setTimeout(() => {
      if (mode === "apply" && itemsSorted + 1 >= 10) {
        endGame();
      } else {
        setFeedback("");
        getRandomItem();
      }
    }, 1200);
  }

  function endGame() {
    setGameActive(false);

    navigate("/score/apply", {
      state: {
        score,
        itemsSorted,
        correctSorts,
      },
    });
  }

  /* =========================
     MODE SELECTION SCREEN
     ========================= */

  if (!mode) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#071024",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "25px",
          color: "white",
        }}
      >
        <img
          src="/Gemini-Logo.png"
          style={{ width: "200px" }}
        />

        <h1 style={{ fontSize: "2.5rem" }}>Choose Game Mode</h1>

        <button
          onClick={() => startGame("apply")}
          style={buttonStyle}
        >
          🧠 Practice Mode
        </button>

        <button
          onClick={() => startGame("arcade")}
          style={buttonStyle}
        >
          ⚡ Arcade Mode
        </button>
      </div>
    );
  }

  /* =========================
     GAME SCREEN
     ========================= */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071024",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <img
        src="/Gemini-Logo.png"
        style={{ width: "150px", marginBottom: "20px" }}
      />

      <h2>Sort the Waste!</h2>

      <div style={{ marginBottom: "10px" }}>
        Score: <b>{score}</b>
      </div>

      {mode === "arcade" && (
        <div style={{ marginBottom: "15px" }}>
          ⏱ Time Left: <b>{timeLeft}</b>
        </div>
      )}

      {currentItem && (
        <div
          style={{
            background: "#0f1b3d",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <div style={{ fontSize: "60px" }}>
            {currentItem.emoji}
          </div>

          <div style={{ fontSize: "22px" }}>
            {currentItem.name}
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          width: "300px",
        }}
      >
        {bins.map((bin) => (
          <button
            key={bin.type}
            style={buttonStyle}
            onClick={() => handleSort(bin.type)}
          >
            {bin.emoji} {bin.name}
          </button>
        ))}
      </div>

      {feedback && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          {feedback}
        </div>
      )}
    </div>
  );
}

/* =========================
   BUTTON STYLE
   ========================= */

const buttonStyle = {
  padding: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#1bd98b",
  color: "#07211a",
  fontWeight: "bold",
};