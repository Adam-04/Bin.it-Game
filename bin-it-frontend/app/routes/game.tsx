import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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
    const item =
      wasteItems[Math.floor(Math.random() * wasteItems.length)];
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
            navigate("/score/arcade", { state: { score } });   //Navigates to ScorePage 
          }, 500);

          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score]);

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
    <div style={{
      minHeight: "100vh",
      background: "#071024",
      color: "white",
      textAlign: "center",
      paddingTop: "40px"
    }}>
      <h1>Bin.IT Waste Sorting Game</h1>

      <h2>Score: {score}</h2>
      <h2>⏱ Time Left: {timeLeft}</h2>

      <div
        draggable={gameActive}
        onDragStart={handleDragStart}
        style={{
          margin: "40px auto",
          width: "160px",
          height: "160px",
          background: "#0f1b3d",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          cursor: "grab"
        }}
      >
        {currentItem.image ? (
          <img src={currentItem.image} style={{ width: "80px" }} />
        ) : (
          <div>{currentItem.emoji}</div>
        )}

        <div style={{ fontSize: "16px" }}>
          {currentItem.name}
        </div>
      </div>

      <p>Drag the item into the correct bin</p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,150px)",
        gap: "20px",
        justifyContent: "center",
        marginTop: "30px"
      }}>
        {bins.map((bin) => (
          <div
            key={bin.type}
            onDrop={(e) => handleDrop(e, bin.type)}
            onDragOver={allowDrop}
            style={{
              height: "160px",
              background: "#0f1b3d",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40px",
              border: "3px solid #1bd98b"
            }}
          >
            <div>{bin.emoji}</div>
            <div style={{ fontSize: "14px" }}>{bin.name}</div>
          </div>
        ))}
      </div>

      {feedback && (
        <div style={{ marginTop: "30px", fontSize: "22px" }}>
          {feedback}
        </div>
      )}
    </div>
  );
}