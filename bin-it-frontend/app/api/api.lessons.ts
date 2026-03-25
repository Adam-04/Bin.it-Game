const BASE_URL = "http://localhost:8080";

/**
 * The backend 'SecurityConfig' requires the Authorization header for all requests.
 * - Authorization: Bearer token for user authentication (JWT)
 * POST requests to /progress are CSRF-exempt in the backend, so only the JWT is required.
 */
const getAuthHeaders = () => ({
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const lessonApi = {
  // GET - Fetches all rows from the lessons table
  getAllLessons: async () => {
    const response = await fetch(`${BASE_URL}/lessons`, {
      headers: getAuthHeaders(),
      credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to fetch lessons");
    return response.json();
  },

  // GET - Returns the progress list for the user
  getUserProgress: async (userId: string) => {
    const response = await fetch(`${BASE_URL}/progress/${userId}`, {
      headers: getAuthHeaders(),
      credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to fetch progress");
    return response.json();
  },

  // POST - Updates the database when user marks a lesson as complete
  markComplete: async (userId: string, lessonId: string) => {
    const response = await fetch(`${BASE_URL}/progress/${userId}/complete/${lessonId}`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include"
    });
    if (!response.ok) throw new Error("Failed to update database");
    return response.json();
  }
};