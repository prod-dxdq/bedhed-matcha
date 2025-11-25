// API CONFIGURATION
// This file handles communication between the website (frontend) and the backend
// It automatically figures out the right URL whether you're on your PC, phone, or online
// Production backend: https://bedhed-matcha-backend.onrender.com

// DEVELOPER NOTE: This function dynamically builds the backend URL
// BUSINESS OWNER NOTE: This makes your website work on your computer, phone, and when deployed online
const getApiBaseUrl = () => {
  // If NEXT_PUBLIC_API_URL is set (production deployment), use that
  if (process.env.NEXT_PUBLIC_API_URL) {
    console.log('Using production API:', process.env.NEXT_PUBLIC_API_URL);
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  if (typeof window !== 'undefined') {
    // When running in the browser locally (client-side):
    // Use the same IP address as the website, but talk to port 3002 (backend)
    // Use https:// if the page is loaded over https, otherwise http://
    const protocol = window.location.protocol;
    const url = `${protocol}//${window.location.hostname}:3002`;
    console.log('Using local API:', url);
    return url;
  }
  // When running on the server during local development:
  // Use localhost since it's on the same computer
  console.log('Using server API: http://localhost:3002');
  return 'http://localhost:3002';
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
