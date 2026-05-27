import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiry and refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for login and signup endpoints to avoid redirect loops and page reloads on bad credentials
    if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/signup')) {
      return Promise.reject(error);
    }

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');
        
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data || response.data;
        localStorage.setItem('accessToken', accessToken);
        if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
