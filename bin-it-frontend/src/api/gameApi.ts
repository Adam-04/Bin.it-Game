import { API_BASE_URL } from "../config/api";

// Health check
export const healthCheck = async (): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/game/health`);
  if (!res.ok) throw new Error("Health check failed");
  return res.text();
};

// Start game
export const startGame = async (
  difficulty: string = "easy"
): Promise<string> => {
  const res = await fetch(
    `${API_BASE_URL}/game/start?difficulty=${difficulty}`,
    { method: "POST" }
  );

  if (!res.ok) throw new Error("Failed to start game");
  return res.text();
};

// Get game state
export const getGame = async (gameId: number): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/game/${gameId}`);
  if (!res.ok) throw new Error("Failed to fetch game");
  return res.text();
};

// Send player action
export const sendAction = async (
  gameId: number,
  action: string
): Promise<string> => {
  const res = await fetch(
    `${API_BASE_URL}/game/${gameId}/action?action=${action}`,
    { method: "POST" }
  );

  if (!res.ok) throw new Error("Action failed");
  return res.text();
};

// End game
export const endGame = async (gameId: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/game/${gameId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to end game");
};

// Test
export const postBook = async (): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/game/books/init`, 
    { method: "POST" }
  );
  if (!res.ok) throw new Error("Failed to post book");
  return res.text();
};

export const getBooks = async (): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/game/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.text();
}