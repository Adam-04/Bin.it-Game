import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("score/:mode", "routes/score.tsx"),
  route("game", "routes/game.tsx")
] satisfies RouteConfig;
