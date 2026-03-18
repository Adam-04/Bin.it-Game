const BASE_URL = "https://api.binit.online/auth";

export const authApi = {
  // Login logic
  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }
    return response.json(); 
  },

  // Registering an account Logic
  register: async (username: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return response.json();
  }
};