import { API_CONFIG, buildUrl } from '@/config/api';

interface LoginCredentials {
  grant_type: string;
  username: string;
  password: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  error?: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('Attempting login with credentials:', { username: credentials.username });
    
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    if (credentials.scope) {
      formData.append('scope', credentials.scope);
    }
    if (credentials.client_id) {
      formData.append('client_id', credentials.client_id);
    }
    if (credentials.client_secret) {
      formData.append('client_secret', credentials.client_secret);
    }

    const response = await fetch(buildUrl('/auth/login'), {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    console.log('Login response:', data);

    // Store the token type and access token
    localStorage.setItem('token_type', data.token_type);
    localStorage.setItem('access_token', data.access_token);
    
    console.log('Login successful');
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};