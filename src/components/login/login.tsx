import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, LogIn, Check, X 
} from "lucide-react";
import { authService } from '../../services/api/authservice';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return "Email required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) return "Password required";
    if (password.length < 8) return "Password too short";
    return "";
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      const errorMessage = name === 'email' 
        ? validateEmail(value) 
        : validatePassword(value);
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmissionStatus('idle');

      const emailError = validateEmail(formData.email);
      const passwordError = validatePassword(formData.password);

      setErrors({
        email: emailError,
        password: passwordError
      });

      if (!emailError && !passwordError) {
        try {
          await authService.signin({
            email: formData.email,
            password: formData.password
          });
          setSubmissionStatus('success');
          // Redirect or handle successful login
        } catch (error: any) {
          setSubmissionStatus('error');
          toast.error(error.response?.data?.message || 'Login failed');
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
        setSubmissionStatus('error');
      }
    },
    [formData]
  );

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleForgotPassword = () => {
    toast.info('Reset password link will be sent to your email');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background image */}
      <div
        className="w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: "url('/Arts.avif')" }}
      >
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold text-center p-6">
            Welcome Back
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white py-16 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-gray-50 rounded-2xl p-8 shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-semibold mb-3 text-gray-700">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full px-5 py-3 pl-12 text-base border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.email 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 focus:border-green-600"
                  }`}
                />
                <Mail className="absolute left-4 top-4 text-gray-500" size={20} />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2 pl-2"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold mb-3 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full px-5 py-3 pl-12 pr-16 text-base border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                    errors.password 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-300 focus:border-green-600"
                  }`}
                />
                <Lock className="absolute left-4 top-4 text-gray-500" size={20} />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-4 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-2 pl-2"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-green-600 hover:text-green-800 transition-colors font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 text-base rounded-xl transition-all duration-300 flex justify-center items-center text-white ${
                isSubmitting 
                  ? "bg-green-400 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700"
              } ${
                submissionStatus === 'success' 
                  ? "bg-green-500" 
                  : submissionStatus === 'error' 
                  ? "bg-red-500" 
                  : ""
              }`}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <svg 
                      className="animate-spin h-5 w-5 mr-2" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </motion.div>
                ) : submissionStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Check className="mr-2" size={20} />
                    Login Successful
                  </motion.div>
                ) : submissionStatus === 'error' ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <X className="mr-2" size={20} />
                    Login Failed
                  </motion.div>
                ) : (
                  <motion.div 
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <LogIn className="mr-2" size={20} />
                    Login
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            Don't have an account? 
            <button 
              onClick={() => window.location.href = '/signup'}
              className="ml-1 text-green-600 hover:text-green-800 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;