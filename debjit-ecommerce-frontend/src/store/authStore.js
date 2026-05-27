import { create } from 'zustand';
import api from '../api/axiosInstance';

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,

  // Initialize from localStorage
  initializeAuth: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('user');

    if (accessToken && user) {
      set({ accessToken, refreshToken, user: JSON.parse(user) });
    }
  },

  // Signup
  signup: async (signupData) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
        contactNumber: signupData.contactNumber,
        gender: signupData.gender,
        dateOfBirth: signupData.dob,
        termsAccepted: signupData.terms,
      };
      const response = await api.post('/auth/signup', payload);
      
      // Some backends return tokens immediately on signup, some require OTP first.
      // We'll safely check for tokens.
      if (response.data?.data?.accessToken) {
        const { accessToken, refreshToken, user } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, accessToken, refreshToken });
      }
      
      set({ loading: false });
      return response.data;
    } catch (error) {
      console.error("Backend validation error response:", error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Account for variations in backend response structures
      const data = response.data?.data || response.data;
      const { accessToken, refreshToken, user } = data;

      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      if (user) localStorage.setItem('user', JSON.stringify(user));

      set({ user, accessToken, refreshToken, loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Request verification OTP
  requestVerificationOtp: async (emailOrPhone) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/verify-account-otp/request', { emailOrPhone });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to request OTP';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Verify account OTP
  verifyAccountOtp: async (emailOrPhone, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/verify-account-otp/verify', {
        emailOrPhone,
        otp,
        otpType: 'ACCOUNT_VERIFICATION',
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Request password reset OTP
  requestPasswordResetOtp: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/forgot-password/request', { email });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to request OTP';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Verify password reset OTP
  verifyPasswordResetOtp: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/forgot-password/verify', {
        email,
        otp,
        otpType: 'PASSWORD_RESET',
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Reset password
  resetPassword: async (email, otp, newPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/forgot-password/reset', {
        email,
        otp,
        newPassword,
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/users/me');
      const user = response.data?.data || response.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, loading: false });
      return response.data;
    } catch (error) {
      set({ error: 'Failed to fetch user', loading: false });
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({ user: null, accessToken: null, refreshToken: null });
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
