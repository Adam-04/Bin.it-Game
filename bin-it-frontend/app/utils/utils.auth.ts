export const handleSignOut = () => {
  // Clear everything related to the user
  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  // Redirect to the login page
  window.location.href = "/"; 
};