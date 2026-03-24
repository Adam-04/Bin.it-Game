import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [

  // landing page
  index("routes/WelcomePage.tsx"),

  // auth
  route("login", "routes/LoginPage.tsx"),
  route("register", "routes/RegisterPage.tsx"),

  // main pages
  route("home", "routes/home.tsx"),
  route("game", "routes/game.tsx"),

  // score
  route("score/:mode", "routes/ScorePage.tsx"),

] satisfies RouteConfig;