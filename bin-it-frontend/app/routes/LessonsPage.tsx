import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { lessonApi } from "../api/api.lessons";
import { wasteItems, bins } from "../data/lessonImages";
import "../app.css";

// Lesson interface that stores and handles the data for each lesson
interface Lesson {
  id: string;
  title: string;
  content: string;
  lessonOrder: number;
}

export default function LessonsPage() {
    const { lessonTitle } = useParams();
    const navigate = useNavigate();

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [allLessons, setAllLessons] = useState<Lesson[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Logic to filter the imported wasteItems based on the current lesson category
    const getFilteredItems = () => {
        if (!currentLesson) return [];
        
        const typeMatch = currentLesson.title.toLowerCase();
        
        // Maps the "Hazardous" lesson title to the "special" type used in lessonImages.ts
        const wasteType = typeMatch === "hazardous" ? "special" : typeMatch;
        
        return wasteItems.filter(item => item.type === wasteType);
    };

    const relevantItems = getFilteredItems();

    //Find adjacent lessons by order and Prevents navigation to the "Test Lesson"
    const getAdjacentTitle = (direction: "next" | "prev") => {
        if (!currentLesson) return null;
        const targetOrder = currentLesson.lessonOrder + (direction === "next" ? 1 : -1);
        
        // Ignores the "Test Lesson" in the database. This line can be removed if
        // the test lesson is deleted from the database.
        if (targetOrder <= 1) return null; 

        const target = allLessons.find((l) => l.lessonOrder === targetOrder);
        return target ? target.title.toLowerCase() : null;
    };

    useEffect(() => {
        // Retrieve the ID saved during login to track progress 
        const storedId = localStorage.getItem("userId");
        setCurrentUserId(storedId);

        const initializeLessonData = async () => {
            if (!lessonTitle || !storedId) return;

            try {
                setLoading(true);

                // Fetch lessons first — this triggers the backend to set the XSRF-TOKEN cookie.
                // Progress fetch comes second so the cookie exists before any POST is made.
                const lessons = await lessonApi.getAllLessons();
                setAllLessons(lessons);

                // Cookie is now guaranteed to exist — safe to fetch progress
                const progressList = await lessonApi.getUserProgress(storedId);

                // Match the URL lessonTitle against the database titles
                const match = lessons.find(
                    (l: Lesson) => l.title.toLowerCase() === lessonTitle.toLowerCase()
                );

                if (match) {
                    setCurrentLesson(match);
                    
                    // Check if this specific UUID is marked as completed in the progress table
                    const hasFinished = progressList.some(
                        (p: any) => p.lessonId === match.id && p.completed
                    );
                    setIsCompleted(hasFinished);
                }
            } catch (err) {
                console.error("Failed to sync lesson data:", err);
            } finally {
                setLoading(false);
            }
        };

        initializeLessonData();
    }, [lessonTitle]); // Re-run when navigation arrows are clicked

    // Handles the logic for marking a lesson as complete, updating the UI and database accordingly.
    // It then disables the button after a click to prevent duplicate entries and requests.
    const handleComplete = async () => {
        if (isCompleted || saving || !currentUserId || !currentLesson) return;

        try {
            setSaving(true);
            await lessonApi.markComplete(currentUserId, currentLesson.id);
            setIsCompleted(true); 
        } catch (err) {
            console.error("Save error:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="page-container">Loading...</div>;

    const nextPath = getAdjacentTitle("next");
    const prevPath = getAdjacentTitle("prev");

    return (
        <div className="page-container">
            <div className="nebula-container">
                <div className="blob blob-yellow"></div>
                <div className="blob blob-teal"></div>
            </div>

            <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

            <main className="auth-card" style={{ maxWidth: "800px", width: "95%" }}>
                <h2 className="auth-title">{currentLesson?.title?.toUpperCase()}</h2>

                <div className="lesson-content-scroll">
                    <p>{currentLesson?.content}</p>

                    {/* NEW: Interactive Item Grid for visual learning */}
                    {relevantItems.length > 0 && (
                        <div className="lesson-reference-section">
                            <h3 className="grid-subtitle">Items for this Bin:</h3>
                            <div className="lesson-grid-container">
                                {relevantItems.map((item, index) => (
                                    <div key={index} className="lesson-grid-item">
                                        <img src={item.image} alt={item.name} className="grid-item-img" />
                                        <span className="grid-item-name">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lesson-navigation-bar">
                    <button className="nav-arrow" disabled={!prevPath} onClick={() => navigate(`/lessons/${prevPath}`)}> ← PREV </button>

                    <button 
                        className={`lesson-action-btn ${isCompleted ? 'completed-state' : ''}`} 
                        onClick={handleComplete} disabled={isCompleted || saving}> 
                        {saving ? "SAVING..." : isCompleted ? "LESSON COMPLETED ✓" : "COMPLETE LESSON"} 
                    </button>

                    <button className="nav-arrow" disabled={!nextPath} onClick={() => navigate(`/lessons/${nextPath}`)}> NEXT → </button>
                </div>
            </main>

            {/* Navigate back to homepage */}
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