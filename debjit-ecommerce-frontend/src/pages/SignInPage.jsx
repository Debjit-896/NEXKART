import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: 'User', email });
    navigate('/');
  };

  return (
    <div className="flex-grow w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto py-10 bg-bg-light min-h-[80vh] flex items-center justify-center">

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden border border-gray-100">

        {/* Left Side: Orange Banner with Lottie */}
        <div className="w-full md:w-1/2 bg-[#0A88FF] p-8 flex flex-col relative overflow-hidden min-h-[320px]">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
              Simplify <br />
              management with <br />
              our dashboard.
            </h1>
            <p className="text-white/90 text-xs max-w-xs mt-3">
              Simplify your e-commerce experience with our user-friendly shopping dashboard.
            </p>
          </div>

          {/* Lottie Animation */}
          <div className="absolute inset-0 flex items-center justify-center mt-20 pt-24">
            <DotLottieReact
              src="/Login.lottie"
              loop
              autoplay
              style={{ width: '75%', height: '75%' }}
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white">

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-5">
            <Link to="/" className="flex items-center justify-center overflow-hidden h-10 w-[120px] mb-3">
              <img src="/logo.png" alt="NextKart" className="w-[120px] max-w-none mix-blend-multiply" />
            </Link>
            <h2 className="text-xl font-bold text-text-dark mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-xs">Please login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-sm placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-sm placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs font-medium text-gray-500 hover:text-primary-blue transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="px-3 text-xs text-gray-400">Or Login with</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* Social Logins */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
              <span className="text-xs font-medium text-gray-700">Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-4 h-4" />
              <span className="text-xs font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs text-gray-500">
              Don't have an account? <Link to="/signup" className="text-[#0A88FF] font-semibold hover:underline">Signup</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
