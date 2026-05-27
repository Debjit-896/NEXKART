import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { useToast } from '../context/ToastContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// At least 6 chars, must contain A-Z, a-z, 0-9, and one of $@#&
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@#&]).{6,}$/;

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup, loading, error: storeError, clearError } = useAuthStore();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear error on change
    setErrors(prev => ({ ...prev, [name]: '' }));
    clearError();
  };

  const validate = () => {
    const newErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g. user@example.com).';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 6 characters and include A-Z, a-z, 0-9, and a special character ($, @, #, &).';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!formData.terms) {
      setErrors({ terms: 'You must agree to the Terms of Service' });
      return;
    }

    // Ensure date is in yyyy-MM-dd format
    let formattedDob = formData.dob;
    if (formattedDob) {
      const parts = formattedDob.split('-');
      // If the user somehow inputted dd-MM-yyyy
      if (parts.length === 3 && parts[2].length === 4) {
        formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    try {
      await signup({
        ...formData,
        dob: formattedDob,
      });
      success("SUCCESS!", "Registration successful. Please verify your email.");

      // Navigate to OTP verification with userData
      navigate('/verify-otp', {
        state: {
          userData: {
            email: formData.email,
            password: formData.password,
          },
        },
      });
    } catch (error) {
      const errorData = error.response?.data;
      
      // Check for the updated backend validation format (errorData.data contains field errors)
      const fieldErrors = errorData?.data;
      if (fieldErrors && typeof fieldErrors === 'object') {
        const mappedErrors = {};
        for (const [key, msg] of Object.entries(fieldErrors)) {
          // Map backend specific names back to frontend state names if needed
          if (key === 'dateOfBirth') mappedErrors.dob = msg;
          else if (key === 'termsAccepted') mappedErrors.terms = msg;
          else mappedErrors[key] = msg;
        }
        setErrors(mappedErrors);
        toastError("ERROR!", "Please check the form fields for errors.");
      } else {
        const errorMsg = errorData?.message || error.message || 'Signup failed. Please try again.';
        toastError("ERROR!", errorMsg);
      }
      console.error('Signup error:', error);
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-sm placeholder-gray-400';
  const errorClass = 'text-red-500 text-[11px] mt-1';

  return (
    <div className="flex-grow w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto py-6 bg-bg-light min-h-[75vh] flex items-center justify-center">

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border border-gray-100">

        {/* Left Side: Blue Banner */}
        <div className="hidden md:flex w-full md:w-5/12 bg-[#0A88FF] p-6 flex-col relative overflow-hidden min-h-[460px]">
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
              Join us &amp; <br />
              start shopping <br />
              smarter.
            </h1>
            <p className="text-white/90 text-[11px] max-w-xs mt-2">
              Create your NextKart account today and unlock exclusive deals and offers.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex-grow flex items-center justify-center mt-4">
            <img src="/signup_illustration.png" alt="Signup Illustration" className="object-contain max-h-[100%] max-w-[100%]" />
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full md:w-7/12 p-4 sm:p-6 flex flex-col justify-center bg-white">

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-4">
            <Link to="/" className="flex items-center justify-center overflow-hidden h-10 w-[120px] mb-2">
              <img src="/logo.png" alt="NextKart" className="w-[120px] max-w-none mix-blend-multiply" />
            </Link>
            <h2 className="text-xl font-bold text-text-dark mb-0.5">Create an Account</h2>
            <p className="text-gray-500 text-xs">Please fill in the details to sign up</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-2.5">

            {/* Row 1: Full Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <input type="text" name="fullName" placeholder="Full Name" required
                  className={`${inputClass} ${errors.fullName ? 'border-red-400 bg-red-50' : ''}`}
                  value={formData.fullName} onChange={handleInputChange} />
                {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
              </div>
              <div>
                <input type="tel" name="contactNumber" placeholder="Contact Number" required
                  className={`${inputClass} ${errors.contactNumber ? 'border-red-400 bg-red-50' : ''}`}
                  value={formData.contactNumber} onChange={handleInputChange} />
                {errors.contactNumber && <p className={errorClass}>{errors.contactNumber}</p>}
              </div>
            </div>

            {/* Row 2: Gender & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <select name="gender" required
                  className={`${inputClass} text-gray-500 ${errors.gender ? 'border-red-400 bg-red-50' : ''}`}
                  value={formData.gender} onChange={handleInputChange}>
                  <option value="" disabled>Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.gender && <p className={errorClass}>{errors.gender}</p>}
              </div>
              <div>
                <input type="date" name="dob" required
                  className={`${inputClass} text-gray-500 ${errors.dob ? 'border-red-400 bg-red-50' : ''}`}
                  value={formData.dob} onChange={handleInputChange} />
                {errors.dob && <p className={errorClass}>{errors.dob}</p>}
              </div>
            </div>

            {/* Row 3: Email */}
            <div>
              <input type="text" name="email" placeholder="Email Address" required
                className={`${inputClass} ${errors.email ? 'border-red-400 bg-red-50' : ''}`}
                value={formData.email} onChange={handleInputChange} />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            {/* Row 4: Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Password */}
              <div>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required
                    className={`${inputClass} ${errors.password ? 'border-red-400 bg-red-50' : ''}`}
                    value={formData.password} onChange={handleInputChange} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className={errorClass}>{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" required
                    className={`${inputClass} ${errors.confirmPassword ? 'border-red-400 bg-red-50' : ''}`}
                    value={formData.confirmPassword} onChange={handleInputChange} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Password hint */}
            <p className="text-[10px] text-gray-400 -mt-1">
              Password must be 6+ characters with uppercase, lowercase, number &amp; special char ($, @, #, &amp;).
            </p>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-0.5">
              <input type="checkbox" name="terms" id="terms" required
                className="mt-0.5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                checked={formData.terms} onChange={handleInputChange} />
              <label htmlFor="terms" className="text-[11px] text-gray-500 leading-tight">
                I agree to the <Link to="#" className="text-primary-blue hover:underline">Terms of Service</Link> &amp; <Link to="#" className="text-primary-blue hover:underline">Privacy Policy</Link>. This is a mandatory requirement to proceed.
              </label>
            </div>
            {errors.terms && <p className={errorClass}>{errors.terms}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors shadow-md mt-2 text-sm"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Already have an account? <Link to="/signin" className="text-[#0A88FF] font-semibold hover:underline">Login</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
