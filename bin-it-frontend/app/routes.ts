import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
    // This makes the Welcome page load at "/" 
    index("routes/WelcomePage.tsx"), 
    
    // Auth
    route("register", "routes/RegisterPage.tsx"),
    route("login", "routes/LoginPage.tsx"),

    // Main pages
    route("home", "routes/home.tsx"),
    route("game", "routes/game.tsx"), // Added from origin/frontend

    // Score
    route("score/:mode", "routes/ScorePage.tsx"),

    // Homepage
    route("homepage", "routes/HomePage.tsx"),

    // Lesson home and pages
    route("lessons", "routes/LessonsHome.tsx"),
    route("lessons/:lessonTitle", "routes/LessonsPage.tsx")
] satisfies RouteConfig;