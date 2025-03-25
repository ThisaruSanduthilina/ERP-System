import { API_CONFIG } from './config/api';

// If VITE_API_URL is not set, default to the API_CONFIG baseURL
export const API_URL = import.meta.env.VITE_API_URL || API_CONFIG.baseURL;