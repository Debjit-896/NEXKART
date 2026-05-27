import axiosInstance from './axiosInstance';

// Signup - Send user registration data and trigger OTP
export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      contactNumber: userData.contactNumber,
      gender: userData.gender,
      dob: userData.dob,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Signup failed' };
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Send OTP for signup verification
export const sendSignupOtp = async (email) => {
  try {
    const response = await axiosInstance.post('/otp/send-signup', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send OTP' };
  }
};

// Verify OTP for signup
export const verifySignupOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/otp/verify-signup', {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};

// Resend OTP for signup
export const resendSignupOtp = async (email) => {
  try {
    const response = await axiosInstance.post('/otp/resend-signup', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to resend OTP' };
  }
};

// Send OTP for forgot password
export const sendForgotPasswordOtp = async (email) => {
  try {
    const response = await axiosInstance.post('/otp/send-forgot-password', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send OTP' };
  }
};

// Verify OTP for forgot password
export const verifyForgotPasswordOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/otp/verify-forgot-password', {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};

// Resend OTP for forgot password
export const resendForgotPasswordOtp = async (email) => {
  try {
    const response = await axiosInstance.post('/otp/resend-forgot-password', {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to resend OTP' };
  }
};

// Reset password
export const resetPassword = async (email, newPassword, confirmPassword) => {
  try {
    const response = await axiosInstance.post('/auth/reset-password', {
      email,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Password reset failed' };
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
