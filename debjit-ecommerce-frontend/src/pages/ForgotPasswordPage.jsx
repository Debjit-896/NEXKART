import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import useAuthStore from "../store/authStore";

const TIMER_SECONDS = 30;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { requestPasswordResetOtp, verifyPasswordResetOtp, resetPassword, loading, error: storeError, clearError } = useAuthStore();

  // Steps: 'enter' (email) -> 'verify' (OTP) -> 'reset' (new password)
  const [step, setStep] = useState("enter");

  // State for 'enter' step
  const [email, setEmail] = useState("");
  const [contactType, setContactType] = useState("email"); // always 'email'
  const [error, setError] = useState("");

  // State for 'verify' step
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // State for 'reset' step
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    if (step !== "verify" || canResend || resetSuccess) return;
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, step, canResend, resetSuccess]);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // --- Step 1: Request OTP ---
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    clearError();
    try {
      await requestPasswordResetOtp(email);
      setContactType("email");
      setStep("verify");
      setError("");
      setTimer(TIMER_SECONDS);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      console.log(`Forgot Password OTP request sent to ${email}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to send OTP. Please try again.");
      console.error("OTP request error:", err);
    }
  };

  // --- Step 2: Verify OTP ---
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    setError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      const digits = pasted.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    clearError();
    try {
      await verifyPasswordResetOtp(email, enteredOtp);
      setStep("reset");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "OTP verification failed. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      console.error("OTP verification error:", err);
    }
  };

  const handleResend = async () => {
    clearError();
    try {
      await requestPasswordResetOtp(email);
      setOtp(["", "", "", "", "", ""]);
      setTimer(TIMER_SECONDS);
      setCanResend(false);
      setError("");
      inputRefs.current[0]?.focus();
      console.log(`OTP resent to ${email}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to resend OTP. Please try again.");
      console.error("OTP resend error:", err);
    }
  };

  const handleChangeContact = () => {
    setStep("enter");
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const maskedEmail = useCallback(() => {
    const [user, domain] = email.split("@");
    return `${user.slice(0, 2)}***@${domain}`;
  }, [email]);

  // --- Step 3: Reset Password ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    clearError();
    try {
      await resetPassword(email, otp.join(""), newPassword);
      setResetSuccess(true);
      setError("");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Password reset failed. Please try again.");
      console.error("Password reset error:", err);
    }
  };

  return (
    <div className="flex-grow w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto py-10 bg-bg-light min-h-[80vh] flex items-center justify-center relative">
      
      {/* Loading Overlay - only show on 'enter' step to avoid flashes */}
      {loading && step === "enter" && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="loader"></div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link
            to="/"
            className="flex items-center justify-center overflow-hidden h-12 w-[170px] mb-3"
          >
            <img
              src="/logo.png"
              alt="NextKart"
              className="w-[170px] max-w-none mix-blend-multiply"
            />
          </Link>
        </div>

        {/* --- STEP 1: ENTER EMAIL --- */}
        {step === "enter" && (
          <>
            <h2 className="text-lg font-bold text-text-dark text-center mb-1">
              Forget Password
            </h2>
            <p className="text-xs text-gray-500 text-center mb-6">
              Enter your email address to receive a 6-digit OTP for password
              reset.
            </p>

            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:bg-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-sm placeholder-gray-400 ${error ? "border-red-400 bg-red-50" : "border-transparent"}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={16} />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-[11px] text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
              >
                Request OTP
              </button>
            </form>

            <div className="mt-5 text-center">
              <button
                onClick={() => navigate("/signin")}
                className="text-xs text-gray-500 hover:text-primary-blue flex items-center justify-center gap-1 mx-auto"
              >
                <ArrowLeft size={14} /> Back to Login
              </button>
            </div>
          </>
        )}

        {/* --- STEP 2: VERIFY OTP --- */}
        {step === "verify" && (
          <>
            <h2 className="text-lg font-bold text-text-dark text-center mb-1">
              Verify OTP
            </h2>
            <p className="text-xs text-gray-500 text-center mb-6">
              Please enter the OTP sent to{" "}
              <span className="font-semibold text-text-dark">
                {maskedEmail()}
              </span>
              .{" "}
              <button
                onClick={handleChangeContact}
                className="text-primary-blue font-semibold hover:underline"
              >
                Change
              </button>
            </p>

            <div
              className="flex justify-center gap-2.5 mb-5"
              onPaste={handleOtpPaste}
            >
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={`w-11 h-12 text-center text-lg font-bold border-2 rounded-lg outline-none transition-all
                    ${
                      digit
                        ? "border-primary-blue bg-blue-50 text-primary-blue"
                        : "border-gray-200 bg-gray-50 text-gray-700"
                    }
                    focus:border-primary-blue focus:bg-white focus:ring-2 focus:ring-primary-blue/30`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <XCircle size={14} className="text-red-500" />
                <p className="text-red-500 text-xs font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={handleVerify}
              className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm mb-4"
            >
              Verify
            </button>

            <div className="text-center text-xs text-gray-500">
              Not received your code?{" "}
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-[#0A88FF] font-semibold hover:underline"
                >
                  Resend Code
                </button>
              ) : (
                <span className="font-semibold text-[#0A88FF]">
                  {formatTime(timer)}
                </span>
              )}
            </div>
          </>
        )}

        {/* --- STEP 3: RESET PASSWORD --- */}
        {step === "reset" && !resetSuccess && (
          <>
            <h2 className="text-lg font-bold text-text-dark text-center mb-1">
              Set New Password
            </h2>
            <p className="text-xs text-gray-500 text-center mb-6">
              Must be at least 6 characters.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-sm placeholder-gray-400"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-sm placeholder-gray-400"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-[11px] text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm mt-2"
              >
                Reset Password
              </button>
            </form>
          </>
        )}

        {/* --- SUCCESS STATE --- */}
        {step === "reset" && resetSuccess && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 size={36} className="text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-text-dark mb-2">
              Password Reset Successfully!
            </h2>
            <p className="text-xs text-gray-500">
              Redirecting you to the login page...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
