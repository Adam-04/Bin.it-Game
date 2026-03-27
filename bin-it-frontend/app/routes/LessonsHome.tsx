import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { lessonApi } from "../api/api.lessons"; 
import "../app.css";

// Import the badge image from your local assets
import badgeImage from "../images/lessonsComplete.png";

interface Lesson {
  id: string;
  title: string;
  description: string;
  lessonOrder: number;
}

interface Progress {
  lessonId: string;
  completed: boolean;
}

export default function LessonsHome() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // 1. Fetch all lessons from the database
        const allLessons = await lessonApi.getAllLessons();

        // 2. Filter out test lessons (lessonOrder 1)
        const validLessons = allLessons.filter((l: Lesson) => l.lessonOrder > 1);
        setLessons(validLessons);

        // 3. Fetch ONLY completed lessons for progress tracking
        const completedData = await lessonApi.getCompletedLessons(userId);
        const ids = completedData.map((p: Progress) => p.lessonId);
        setCompletedIds(ids);

      } catch (err) {
        console.error("Failed to sync Lessons Center:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId, navigate]);

  // Calculate percentage based on actual database counts
  const progressPercent = lessons.length > 0 
    ? Math.round((completedIds.length / lessons.length) * 100) 
    : 0;

  const isMastered = progressPercent === 100;

  return (
    <div className="page-container">
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      <main className="auth-card">
        <h1 className="auth-title">LESSON CENTER</h1>

        {/* BADGE SECTION */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: "30px", 
          padding: "25px",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "25px",
          border: isMastered ? "1px solid var(--accent-green)" : "1px dashed rgba(255,255,255,0.15)",
          transition: "all 0.5s ease"
        }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img 
              src={badgeImage}
              alt="Master Sorter Badge"
              style={{ 
                // Increased size for a better "Reward" feel
                width: "120px", 
                height: "120px",
                objectFit: "contain",
                // Greyscale and darkened when locked; bright and popping when unlocked
                filter: isMastered ? "none" : "grayscale(100%) brightness(30%)",
                transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: isMastered ? "scale(1.1)" : "scale(0.9)"
              }} 
            />
            {!isMastered && (
              <span style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1.5rem", // Slightly larger lock for the larger image
                opacity: 0.6
              }}>🔒</span>
            )}
          </div>
          
          <p style={{ 
            fontSize: "0.8rem", 
            marginTop: "15px", 
            fontWeight: "bold",
            color: isMastered ? "var(--accent-green)" : "var(--text-dim)",
            letterSpacing: "1.5px",
            textTransform: "uppercase"
          }}>
            {isMastered ? "🏆 Master Sorter Unlocked" : "Complete all modules to earn your badge"}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ width: "100%", marginBottom: "30px", textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-dim)" }}>
                TOTAL PROGRESS
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: "bold", color: "var(--accent-teal)" }}>
                {progressPercent}%
            </span>
          </div>
          <div style={{ 
            width: "100%", 
            height: "10px", 
            background: "rgba(255,255,255,0.1)", 
            borderRadius: "5px", 
            overflow: "hidden" 
          }}>
            <div style={{ 
              width: `${progressPercent}%`, 
              height: "100%", 
              background: "linear-gradient(90deg, var(--accent-teal), var(--accent-green))", 
              borderRadius: "5px",
              transition: "width 1s ease-in-out" 
            }} />
          </div>
        </div>

        {/* DYNAMIC LESSON BUTTONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
          {isLoading ? (
            <p style={{ color: "var(--text-dim)", textAlign: "center" }}>Fetching modules...</p>
          ) : (
            lessons
              .sort((a, b) => a.lessonOrder - b.lessonOrder)
              .map((lesson) => {
                const isDone = completedIds.includes(lesson.id);
                return (
                  <button 
                    key={lesson.id}
                    className={`action-button ${isDone ? 'completed-highlight' : ''}`}
                    onClick={() => navigate(`/lessons/${lesson.title.toLowerCase()}`)}
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '0 25px',
                        border: isDone ? '1px solid var(--accent-green)' : '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <span>{lesson.title.toUpperCase()}</span>
                    <span style={{ fontSize: "1.2rem" }}>
                        {isDone ? "✓" : "→"}
                    </span>
                  </button>
                );
              })
          )}
        </div>

        <p className="redirect-text" style={{ marginTop: "25px" }}>
          {isMastered 
            ? "Mastery achieved! Ready for the Arcade?" 
            : "Finish your training to unlock the special badge."}
        </p>
      </main>

      {/* Navigation back to homepage */}
      <button 
        onClick={() => navigate("/homepage")} 
        className="exit-container" 
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span>HOMEPAGE</span>
        <span className="exit-icon">🚪</span>
      </button>
    </div>
  );
}