// Use window.location.hostname to dynamically get the host, fallback to localhost for server-side rendering
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use the same host as the frontend but port 3001
    return `http://${window.location.hostname}:3001`;
  }
  // Server-side: use localhost
  return 'http://localhost:3001';
};

export async function fetchMenu() {
  const response = await fetch(`${getApiBaseUrl()}/api/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  return response.json();
}

export async function fetchLocations() {
  const response = await fetch(`${getApiBaseUrl()}/api/locations`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
}
