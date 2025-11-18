// API CONFIGURATION
// This file handles communication between the website (frontend) and the backend
// It automatically figures out the right URL whether you're on your PC or phone

// DEVELOPER NOTE: This function dynamically builds the backend URL
// BUSINESS OWNER NOTE: This makes your website work on both your computer and phone automatically
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // When running in the browser (client-side):
    // Use the same IP address as the website, but talk to port 3001 (backend)
    // Example: If you visit 192.168.1.81:3000, it will call 192.168.1.81:3001
    return `http://${window.location.hostname}:3001`;
  }
  // When running on the server (during page build):
  // Use localhost since it's on the same computer
  return 'http://localhost:3001';
};

// FETCH MENU ITEMS
// DEVELOPER NOTE: This async function calls the backend /api/menu endpoint
// BUSINESS OWNER NOTE: This gets your drink menu from the backend and displays it on the website
export async function fetchMenu() {
  const response = await fetch(`${getApiBaseUrl()}/api/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  return response.json();
}

// FETCH LOCATIONS
// DEVELOPER NOTE: This async function calls the backend /api/locations endpoint
// BUSINESS OWNER NOTE: This gets your pop-up schedule from the backend and shows it on the website
export async function fetchLocations() {
  const response = await fetch(`${getApiBaseUrl()}/api/locations`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
}
