import { BACKEND_ADDRESS } from "./api.config";

export const authApi = {
  // Login logic
  login: async (username: string, password: string) => {
    const response = await fetch(`${BACKEND_ADDRESS}/auth/login`, {
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
    const response = await fetch(`${BACKEND_ADDRESS}/auth/register`, {
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