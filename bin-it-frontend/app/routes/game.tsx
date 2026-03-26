import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../app.css"; 
const backendUrl = "http://localhost:8080";

// Bin Images
import blackBinClosed from "../images/trashCans/blackBinClosed.png"
import blackBinOpen from "../images/trashCans/blackBinOpen.png"
import blueBinClosed from "../images/trashCans/blueBinClosed.png"
import blueBinOpen from "../images/trashCans/blueBinOpen.png"
import greenBinClosed from "../images/trashCans/greenBinClosed.png"
import greenBinOpen from "../images/trashCans/greenBinOpen.png"
import hazardBinClosed from "../images/trashCans/specialBinClosed.png"
import hazardBinOpen from "../images/trashCans/specialBinOpen.png"

// trash item images
import styrofoam from "../images/garbageImages/trash/styrofoamPlate.png"
import babyWipes from "../images/garbageImages/trash/babyWipes.png"
import brick from "../images/garbageImages/trash/brickAndTextiles.png"
import clinicalMask from "../images/garbageImages/trash/clinicalMask.png"
import diaper from "../images/garbageImages/trash/diaper.png"
import fastFoodCup from "../images/garbageImages/trash/disposableFastfoodCup.png"
import garbageBag from "../images/garbageImages/trash/garbageBag.png"
import sponges from "../images/garbageImages/trash/sponges.png"
import toothpaste from "../images/garbageImages/trash/toothpaste.png"
import waterhose from "../images/garbageImages/trash/waterHose.png"

// recycling item images
import glassBottle from "../images/garbageImages/recycling/glassJar.png"
import paper from "../images/garbageImages/recycling/crumpledPaper.png"
import plasticBottle from "../images/garbageImages/recycling/plasticBottle.png"
import cardboardBox from "../images/garbageImages/recycling/cardboardBox.png"
import detergentBottle from "../images/garbageImages/recycling/detergentBottle.png"
import eggCarton from "../images/garbageImages/recycling/eggCartoon.png"
import foilTray from "../images/garbageImages/recycling/foilTray.png"
import foodCan from "../images/garbageImages/recycling/foodCan.png"
import newsPaper from "../images/garbageImages/recycling/newspaper.png"
import wineBottle from "../images/garbageImages/recycling/wineBottle.png"

// compost item images
import appleCore from "../images/garbageImages/compost/appleCore.png"
import bananaPeel from "../images/garbageImages/compost/bananaPeel.png"
import coffeeGrounds from "../images/garbageImages/compost/coffeeGrounds.png"
import deadLeaves from "../images/garbageImages/compost/deadLeaves.png"
import eggShells from "../images/garbageImages/compost/eggshells.png"
import friedChickenBones from "../images/garbageImages/compost/friedChickenBones.png"
import leftoverTakeout from "../images/garbageImages/compost/leftoverTakeout.png"
import moldyCheese from "../images/garbageImages/compost/moldyCheese.png"
import oldFlowers from "../images/garbageImages/compost/oldFlowers.png"
import yardRemains from "../images/garbageImages/compost/yardRemains.png"

// hazardous item images
import paintCan from "../images/garbageImages/special/paintBucket.png"
import battery from "../images/garbageImages/special/batteries.png"
import laptop from "../images/garbageImages/special/brokenLaptop.png"
import phone from "../images/garbageImages/special/brokenPhone.png"
import carBattery from "../images/garbageImages/special/carBattery.png"
import gasCylinder from "../images/garbageImages/special/gasCylinder.png"
import lightbulb from "../images/garbageImages/special/lightbulb.png"
import motorOil from "../images/garbageImages/special/motorOil.png"
import pesticide from "../images/garbageImages/special/pesticide.png"
import sprayCan from "../images/garbageImages/special/sprayCan.png"

type WasteItem = {
  name: string;
  type: string;
  image: string;
};

const bins = [
  { type: "trash",     name: "Trash",     closed: blackBinClosed,  open: blackBinOpen  },
  { type: "recycling", name: "Recycling", closed: blueBinClosed,   open: blueBinOpen   },
  { type: "compost",   name: "Compost",   closed: greenBinClosed,  open: greenBinOpen  },
  { type: "special",   name: "Hazardous", closed: hazardBinClosed, open: hazardBinOpen },
];

const imageMap: Record<string, string> = {
  "trash/styrofoamPlate":        styrofoam,
  "trash/babyWipes":             babyWipes,
  "trash/brickAndTextiles":      brick,
  "trash/clinicalMask":          clinicalMask,
  "trash/diaper":                diaper,
  "trash/disposableFastfoodCup": fastFoodCup,
  "trash/garbageBag":            garbageBag,
  "trash/sponges":               sponges,
  "trash/toothpaste":            toothpaste,
  "trash/waterHose":             waterhose,
  "recycling/glassJar":          glassBottle,
  "recycling/crumpledPaper":     paper,
  "recycling/plasticBottle":     plasticBottle,
  "recycling/cardboardBox":      cardboardBox,
  "recycling/detergentBottle":   detergentBottle,
  "recycling/eggCartoon":        eggCarton,
  "recycling/foilTray":          foilTray,
  "recycling/foodCan":           foodCan,
  "recycling/newspaper":         newsPaper,
  "recycling/wineBottle":        wineBottle,
  "compost/appleCore":           appleCore,
  "compost/bananaPeel":          bananaPeel,
  "compost/coffeeGrounds":       coffeeGrounds,
  "compost/deadLeaves":          deadLeaves,
  "compost/eggshells":           eggShells,
  "compost/friedChickenBones":   friedChickenBones,
  "compost/leftoverTakeout":     leftoverTakeout,
  "compost/moldyCheese":         moldyCheese,
  "compost/oldFlowers":          oldFlowers,
  "compost/yardRemains":         yardRemains,
  "special/paintBucket":         paintCan,
  "special/batteries":           battery,
  "special/brokenLaptop":        laptop,
  "special/brokenPhone":         phone,
  "special/carBattery":          carBattery,
  "special/gasCylinder":         gasCylinder,
  "special/lightbulb":           lightbulb,
  "special/motorOil":            motorOil,
  "special/pesticide":           pesticide,
  "special/sprayCan":            sprayCan,
};

//  ADDITION: helper to read the CSRF cookie Spring Security sets 
function getCsrfToken(): string {
  return document.cookie.split("; ").find((c) => c.startsWith("XSRF-TOKEN="))?.split("=")[1] ?? "";
}

const wasteItems: WasteItem[] = [
  // Trash
  { name: "Styrofoam Plate",   type: "trash", image: styrofoam     },
  { name: "Baby Wipes",        type: "trash", image: babyWipes     },
  { name: "Brick & Textiles",  type: "trash", image: brick         },
  { name: "Clinical Mask",     type: "trash", image: clinicalMask  },
  { name: "Diaper",            type: "trash", image: diaper        },
  { name: "Fast Food Cup",     type: "trash", image: fastFoodCup   },
  { name: "Garbage Bag",       type: "trash", image: garbageBag    },
  { name: "Sponges",           type: "trash", image: sponges       },
  { name: "Toothpaste",        type: "trash", image: toothpaste    },
  { name: "Water Hose",        type: "trash", image: waterhose     },

  // Recycling
  { name: "Glass Jar",         type: "recycling", image: glassBottle      },
  { name: "Crumpled Paper",    type: "recycling", image: paper            },
  { name: "Plastic Bottle",    type: "recycling", image: plasticBottle    },
  { name: "Cardboard Box",     type: "recycling", image: cardboardBox     },
  { name: "Detergent Bottle",  type: "recycling", image: detergentBottle  },
  { name: "Egg Carton",        type: "recycling", image: eggCarton        },
  { name: "Foil Tray",         type: "recycling", image: foilTray         },
  { name: "Food Can",          type: "recycling", image: foodCan          },
  { name: "Newspaper",         type: "recycling", image: newsPaper        },
  { name: "Wine Bottle",       type: "recycling", image: wineBottle       },

  // Compost
  { name: "Apple Core",        type: "compost", image: appleCore          },
  { name: "Banana Peel",       type: "compost", image: bananaPeel         },
  { name: "Coffee Grounds",    type: "compost", image: coffeeGrounds      },
  { name: "Dead Leaves",       type: "compost", image: deadLeaves         },
  { name: "Egg Shells",        type: "compost", image: eggShells          },
  { name: "Chicken Bones",     type: "compost", image: friedChickenBones  },
  { name: "Leftover Takeout",  type: "compost", image: leftoverTakeout    },
  { name: "Moldy Cheese",      type: "compost", image: moldyCheese        },
  { name: "Old Flowers",       type: "compost", image: oldFlowers         },
  { name: "Yard Remains",      type: "compost", image: yardRemains        },

  // Hazardous
  { name: "Paint Can",         type: "special", image: paintCan     },
  { name: "Battery",           type: "special", image: battery      },
  { name: "Broken Laptop",     type: "special", image: laptop       },
  { name: "Broken Phone",      type: "special", image: phone        },
  { name: "Car Battery",       type: "special", image: carBattery   },
  { name: "Gas Cylinder",      type: "special", image: gasCylinder  },
  { name: "Lightbulb",         type: "special", image: lightbulb    },
  { name: "Motor Oil",         type: "special", image: motorOil     },
  { name: "Pesticide",         type: "special", image: pesticide    },
  { name: "Spray Can",         type: "special", image: sprayCan     },
];

export default function Game() {
  const navigate = useNavigate();

  // Ensures API is only called once.
  const isSubmitting = useRef(false);

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

  // Tracks the floating ghost image position during touch drag
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingTouch = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${backendUrl}/waste/random/arcade`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((data: { garbageType: string; path: string }[]) => {
        const mapped: WasteItem[] = data
          .map((item) => ({
            name: item.path.split("/").pop()!.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim(),
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
    const token  = localStorage.getItem("token");

    console.log("userId:", userId);  // add this
    console.log("token:", token);    // add this

    if(isSubmitting.current) return; // Prevent multiple submissions
    if (!userId || !token) return;

    try {
      isSubmitting.current = true;

      const res = await fetch(`${backendUrl}/game/arcade/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          score: finalScore
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Score submit failed:", text);
        isSubmitting.current = false; // allow retrying
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

  //  Mouse drag handlers 
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

  //  Touch handlers 
  function handleTouchStart(e: React.TouchEvent) {
    if (!gameActive) return;
    isDraggingTouch.current = true;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDraggingTouch.current) return;
    e.preventDefault(); // prevents page scrolling while dragging

    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });

    // Check which bin (if any) the finger is currently over and highlight it
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const binEl = el?.closest("[data-bin-type]");
    const binType = binEl?.getAttribute("data-bin-type") ?? null;
    setHoveredBin(binType);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!isDraggingTouch.current) return;
    isDraggingTouch.current = false;
    setTouchPos(null);
    setHoveredBin(null);

    const touch = e.changedTouches[0];

    // Find what element is under the finger when released
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const binEl = el?.closest("[data-bin-type]");
    const binType = binEl?.getAttribute("data-bin-type");

    if (binType) {
      resolveItem(binType);
    }
  }

  //  Shared scoring logic 
  function resolveItem(binType: string) {
    if (currentItem.type === binType) {
      setScore((s) => { scoreRef.current = s + 10; return s + 10; });
      setFeedback("✅ Correct!");
    } else {
      setScore((s) => { scoreRef.current = Math.max(0, s - 5); return Math.max(0, s - 5); });
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
            fontSize: "60px",
            cursor: gameActive ? "grab" : "default",
            // Hide the original card while touch-dragging so only the ghost shows
            opacity: touchPos ? 0 : 1,
            transition: "opacity 0.1s"
          }}
        >
          <img src={currentItem.image} style={{ width: "100%", height: "100%", objectFit: "fill" }} alt={currentItem.name} />
          <div style={{ fontSize: "1rem", color: "var(--text-dim)", marginTop: "10px", fontWeight: "bold" }}>
            {currentItem.name}
          </div>
        </div>

        {/* GHOST IMAGE follows finger during touch drag */}
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
        {/* WASTE BINS GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth < 600 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "7%",
          width: "100%",
          maxWidth: window.innerWidth < 600 ? "360px" : "600px",
          margin: "0 auto",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "0 16px",
        }}>
          {bins.map((bin) => (
            <div
              key={bin.type}
              data-bin-type={bin.type}
              onDrop={(e) => handleDrop(e, bin.type)}
              onDragOver={(e) => { allowDrop(e); setHoveredBin(bin.type); }}
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
