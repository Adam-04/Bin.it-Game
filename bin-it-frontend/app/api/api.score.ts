// services/score.ts
import { BACKEND_ADDRESS } from "./api.config";

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
}

export const scoreApi = {
  getLeaderboard: async (limit: number = 10): Promise<LeaderboardEntry[]> => {
    // 1. Grab the token you saved during the login process
    const token = localStorage.getItem("token");

    // 2. Add the Authorization header to the fetch call
    const response = await fetch(`${BACKEND_ADDRESS}/leaderboard?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // This 'Bearer ' prefix is what your JwtAuthFilter expects
        "Authorization": `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      // This will now catch 401 (Unauthorized) or 403 (Forbidden)
      throw new Error("Failed to fetch leaderboard");
    }

    return await response.json();
  },
};