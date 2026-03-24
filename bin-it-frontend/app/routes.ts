import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
    // This makes the Login page load at "/" and removes the need for route("login")
    index("routes/WelcomePage.tsx"), 
    
    route("register", "routes/RegisterPage.tsx"),
    route("login", "routes/LoginPage.tsx"),
    route("home", "routes/home.tsx"),
    route("score/:mode", "routes/ScorePage.tsx"),
] satisfies RouteConfig;