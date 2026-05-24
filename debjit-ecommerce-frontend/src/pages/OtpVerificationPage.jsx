import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TIMER_SECONDS = 30;

// Generate a random 6-digit OTP for demo purposes
function generateOTP() {
  // TODO: Uncomment for production
  // return String(Math.floor(100000 + Math.random() * 900000));
  return "111111"; // Hardcoded OTP for development
}

export default function OtpVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const userData = location.state?.userData;

  // Steps: 'enter' → enter email/mobile, 'verify' → enter OTP
  const [step, setStep] = useState('enter');
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState(''); // 'email' or 'mobile'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // If no userData, redirect back to signup
  useEffect(() => {
    if (!userData) {
      navigate('/signup');
    }
  }, [userData, navigate]);

  // Countdown timer
  useEffect(() => {
    if (step !== 'verify' || canResend || success) return;
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, step, canResend, success]);

  const detectContactType = (value) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
    if (/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'mobile';
    return '';
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    const type = detectContactType(contact);
    if (!type) {
      setError('Please enter a valid email address or 10-digit mobile number.');
      return;
    }
    setContactType(type);
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setStep('verify');
    setError('');
    setTimer(TIMER_SECONDS);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);

    // For demo: show OTP in console
    console.log(`[Demo] OTP sent to ${contact}: ${newOtp}`);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // only allow single digit
    setError('');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const digits = pasted.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }
    if (enteredOtp !== generatedOtp) {
      setError('OTP is incorrect. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      return;
    }
    // Success!
    setSuccess(true);
    setError('');
    if (userData) {
      login({ name: userData.fullName, email: userData.email });
    }
    setTimeout(() => navigate('/'), 2000);
  };

  const handleResend = () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setOtp(['', '', '', '', '', '']);
    setTimer(TIMER_SECONDS);
    setCanResend(false);
    setError('');
    inputRefs.current[0]?.focus();
    console.log(`[Demo] OTP resent to ${contact}: ${newOtp}`);
  };

  const handleChange = () => {
    setStep('enter');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess(false);
  };

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const maskedContact = useCallback(() => {
    if (contactType === 'email') {
      const [user, domain] = contact.split('@');
      return `${user.slice(0, 2)}***@${domain}`;
    }
    const digits = contact.replace(/\D/g, '');
    return `${digits.slice(0, 4)}****${digits.slice(-2)}`;
  }, [contact, contactType]);

  if (!userData) return null;

  return (
    <div className="flex-grow w-full px-4 md:px-10 lg:px-16 xl:px-24 mx-auto py-10 bg-bg-light min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">

        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link to="/" className="flex items-center justify-center overflow-hidden h-12 w-[170px] mb-3">
            <img src="/logo.png" alt="NextKart" className="w-[170px] max-w-none mix-blend-multiply" />
          </Link>
        </div>

        {/* Step 1: Enter Email / Mobile */}
        {step === 'enter' && (
          <>
            <h2 className="text-lg font-bold text-text-dark text-center mb-1">OTP Verification</h2>
            <p className="text-xs text-gray-500 text-center mb-6">
              Enter your email address or mobile number to receive a 6-digit OTP.
            </p>

            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Email or Mobile Number"
                  value={contact}
                  onChange={(e) => { setContact(e.target.value); setError(''); }}
                  required
                  className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl focus:bg-white focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all text-sm placeholder-gray-400 ${error ? 'border-red-400 bg-red-50' : 'border-transparent'}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {detectContactType(contact) === 'email' ? <Mail size={16} /> : <Phone size={16} />}
                </div>
              </div>

              {error && <p className="text-red-500 text-[11px] text-center">{error}</p>}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
              >
                Request OTP
              </button>
            </form>

            <div className="mt-5 text-center">
              <button onClick={() => navigate('/signup')} className="text-xs text-gray-500 hover:text-primary-blue flex items-center justify-center gap-1 mx-auto">
                <ArrowLeft size={14} /> Back to Sign Up
              </button>
            </div>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 'verify' && !success && (
          <>
            <h2 className="text-lg font-bold text-text-dark text-center mb-1">Enter OTP</h2>
            <p className="text-xs text-gray-500 text-center mb-6">
              Please enter the OTP sent to{' '}
              <span className="font-semibold text-text-dark">{maskedContact()}</span>.{' '}
              <button onClick={handleChange} className="text-primary-blue font-semibold hover:underline">
                Change
              </button>
            </p>

            {/* 6 OTP Boxes */}
            <div className="flex justify-center gap-2.5 mb-5" onPaste={handleOtpPaste}>
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
                    ${digit
                      ? 'border-primary-blue bg-blue-50 text-primary-blue'
                      : 'border-gray-200 bg-gray-50 text-gray-700'}
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

            {/* Resend / Timer */}
            <div className="text-center text-xs text-gray-500">
              Not received your code?{' '}
              {canResend ? (
                <button onClick={handleResend} className="text-[#0A88FF] font-semibold hover:underline">
                  Resend Code
                </button>
              ) : (
                <span className="font-semibold text-[#0A88FF]">{formatTime(timer)}</span>
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
            <h2 className="text-lg font-bold text-text-dark mb-2">Verification Successful!</h2>
            <p className="text-xs text-gray-500">Your account has been verified. Redirecting you to the homepage...</p>
          </div>
        )}

      </div>
    </div>
  );
}
