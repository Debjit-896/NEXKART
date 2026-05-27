import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import useAuthStore from "../store/authStore";
import { useToast } from "../context/ToastContext";

const TIMER_SECONDS = 30;

export default function OtpVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, requestVerificationOtp, verifyAccountOtp, loading, clearError } = useAuthStore();
  const userData = location.state?.userData;
  const { success: toastSuccess, error: toastError } = useToast();

  // Steps: 'enter' → enter email, 'verify' → enter OTP
  const [step, setStep] = useState("enter");
  const [email, setEmail] = useState("");
  const [contactType, setContactType] = useState("email"); // always 'email'
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // If no userData, redirect back to signup and prefill email when available
  useEffect(() => {
    if (!userData) {
      navigate("/signup");
      return;
    }
    if (userData.email) {
      setEmail(userData.email);
    }
  }, [userData, navigate]);

  // Countdown timer
  useEffect(() => {
    if (step !== "verify" || canResend || success) return;
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, step, canResend, success]);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    clearError();
    try {
      // Call backend to send OTP
      await requestVerificationOtp(email);
      setContactType("email");
      setStep("verify");
      setError("");
      setTimer(TIMER_SECONDS);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      console.log(`OTP request sent to ${email}`);
    } catch (err) {
      toastError("ERROR!", err.response?.data?.message || err.message || "Failed to send OTP. Please try again.");
      console.error("OTP request error:", err);
    }
  };

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
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
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
      // Verify OTP with backend
      await verifyAccountOtp(email, enteredOtp);
      
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      toastError("ERROR!", err.response?.data?.message || err.message || "OTP verification failed. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      console.error("OTP verification error:", err);
    }
  };

  const handleResend = async () => {
    clearError();
    try {
      await requestVerificationOtp(email);
      setOtp(["", "", "", "", "", ""]);
      setTimer(TIMER_SECONDS);
      setCanResend(false);
      setError("");
      inputRefs.current[0]?.focus();
      console.log(`OTP resent to ${email}`);
      toastSuccess("SUCCESS!", "OTP has been resent successfully.");
    } catch (err) {
      toastError("ERROR!", err.response?.data?.message || err.message || "Failed to resend OTP. Please try again.");
      console.error("OTP resend error:", err);
    }
  };

  const handleChange = () => {
    setStep("enter");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess(false);
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

  if (!userData) return null;

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

        {/* Step 1: Enter Email */}
        {step === "enter" && (
          <>
            <h2 className="text-lg font-bold text-text-dark text-center mb-1">
              OTP Verification
            </h2>
            <p className="text-xs text-gray-500 text-center mb-6">
              Enter your email address to receive a 6-digit OTP.
            </p>

            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter Email Address"
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


              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
              >
                Request OTP
              </button>
            </form>

            <div className="mt-5 text-center">
              <button
                onClick={() => navigate("/signup")}
                className="text-xs text-gray-500 hover:text-primary-blue flex items-center justify-center gap-1 mx-auto"
              >
                <ArrowLeft size={14} /> Back to Sign Up
              </button>
            </div>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === "verify" && !success && (
          <>
            <h2 className="text-lg font-bold text-text-dark text-center mb-1">
              Enter OTP
            </h2>
            <p className="text-xs text-gray-500 text-center mb-6">
              Please enter the OTP sent to{" "}
              <span className="font-semibold text-text-dark">
                {maskedEmail()}
              </span>
              .{" "}
              <button
                onClick={handleChange}
                className="text-primary-blue font-semibold hover:underline"
              >
                Change
              </button>
            </p>

            {/* 6 OTP Boxes */}
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


            <button
              onClick={handleVerify}
              className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm mb-4"
            >
              Verify
            </button>

            {/* Resend / Timer */}
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

        {/* Success State */}
        {success && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 size={36} className="text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-text-dark mb-2">
              Verification Successful!
            </h2>
            <p className="text-xs text-gray-500">
              Your account has been verified. Redirecting you to the homepage...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
