// API configuration
export const API_CONFIG = {
  baseURL: "http://127.0.0.1:8084",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Access-Control-Allow-Origin': '*'
  }
};

// Create and export the api object for making HTTP requests
export const api = {
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
  post: async (path, data) => {
    const token = localStorage.getItem('access_token');
    const headers = {
      ...API_CONFIG.headers,
      'Authorization': token ? `Bearer ${token}` : '',
    };

    const response = await fetch(`${API_CONFIG.baseURL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

// Helper function to build URLs
export const buildUrl = (path) => {
  const baseUrl = API_CONFIG.baseURL;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? `Bearer ${token}` : '';
};

// Helper function to handle API responses
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || `API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};