import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bin.IT" },
    { name: "description", content: "Waste sorting game" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Bin.IT</h1>
    </div>
  );
} 