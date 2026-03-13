import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bin-It - Welcome Page" },
    { name: "description", content: "Welcome page for the Bin-It game" },
  ];
}

export default function Home() {
  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>WELCOME TO BIN-IT</h1>
      <p>This is where the user will choose their game mode.</p>
    </div>
  );
}