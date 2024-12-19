import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { 
  User, Mail, Lock, Phone, UserPlus, Eye, EyeOff,
  CheckCircle, LogIn 
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  termsAccepted: boolean;
}

interface ValidationRules {
  [key: string]: (value: string, formData?: FormData) => string;
}

const SuccessModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSignIn: () => void;
}> = ({ isOpen, onClose, onSignIn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl p-4 max-w-sm w-full text-center"
      >
        <CheckCircle className="mx-auto text-green-600 mb-3" size={36} />
        <h2 className="text-lg font-bold mb-3 text-gray-800">Registration Successful!</h2>
        <p className="text-gray-600 mb-3 text-sm">
          Your account has been created successfully. 
          You can now sign in and start exploring.
        </p>
        <div className="flex space-x-3 justify-center">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm"
          >
            Close
          </button>
          <button 
            onClick={onSignIn}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center text-sm"
          >
            <LogIn className="mr-1" size={14} />
            Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SignupFormWithImage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<{ [key in keyof FormData]: string }>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    termsAccepted: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validationRules: ValidationRules = useMemo(
    () => ({
      fullName: (value) => {
        if (!value.trim()) return "Full name required";
        if (value.trim().split(" ").length < 2) return "First and last name";
        return "";
      },
      email: (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) return "Email required";
        if (!emailRegex.test(value)) return "Invalid email";
        return "";
      },
      password: (value) => {
        if (value.length < 8) return "Min 8 characters";
        if (!/[A-Z]/.test(value)) return "Uppercase letter needed";
        if (!/[0-9]/.test(value)) return "Number needed";
        return "";
      },
      confirmPassword: (value, formData) => {
        if (value !== formData?.password) return "Passwords don't match";
        return "";
      },
      phone: (value) => {
        const phoneRegex = /^\+?([0-9]{2})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (value && !phoneRegex.test(value)) return "Invalid phone";
        return "";
      },
      termsAccepted: (value) => (value ? "" : "Accept terms"),
    }),
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({ ...prev, [name]: fieldValue }));

      const errorMessage = validationRules[name](fieldValue as string, formData);

      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    },
    [validationRules, formData]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors = {} as { [key in keyof FormData]: string };

      (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
        newErrors[key] = validationRules[key](formData[key] as string, formData);
      });

      setErrors(newErrors);

      if (Object.values(newErrors).every((error) => error === "")) {
        setShowSuccessModal(true);
      }
    },
    [formData, validationRules]
  );

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderInputField = (
    name: keyof FormData,
    label: string,
    type: string,
    icon: React.ElementType
  ) => {
    const Icon = icon;
    const error = errors[name];

    return (
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
        <div className="relative">
          <input
            type={type === 'password' 
              ? (showPassword[name as 'password' | 'confirmPassword'] ? 'text' : 'password')
              : type
            }
            name={name}
            value={formData[name] as string}
            onChange={handleInputChange}
            placeholder={`Enter your ${label.toLowerCase()}`}
            className={`w-full px-4 py-2 pl-10 ${type === 'password' ? 'pr-12' : ''} text-sm border-2 rounded-lg focus:outline-none transition-all duration-300 ${
              error 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 focus:border-green-600"
            }`}
          />
          <Icon className="absolute left-3 top-3 text-gray-500" size={16} />
          
          {type === 'password' && (
            <button
              type="button"
              onClick={() => togglePasswordVisibility(name as 'password' | 'confirmPassword')}
              className="absolute right-3 top-3 text-gray-500 hover:text-green-600 transition-colors"
            >
              {showPassword[name as 'password' | 'confirmPassword'] 
                ? <EyeOff size={16} /> 
                : <Eye size={16} />
              }
            </button>
          )}
          
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs mt-1 pl-1"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const handleSignIn = () => {
    alert('Navigate to Sign In Page');
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left side - Image */}
        <div
          className="w-1/2 bg-cover bg-center hidden lg:block"
          style={{ backgroundImage: "url('/Arts.avif')" }}
        >
          <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-xl font-bold text-center p-3">
              Create Your Account
            </h1>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 bg-white py-4 px-2 flex items-center justify-center">
          <div className="max-w-md w-full bg-gray-50 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderInputField("fullName", "Full Name", "text", User)}
              {renderInputField("email", "Email Address", "email", Mail)}
              {renderInputField("password", "Password", "password", Lock)}
              {renderInputField("confirmPassword", "Confirm Password", "password", Lock)}
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={`w-full px-4 py-2 pl-10 text-sm border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                      errors.phone 
                        ? "border-red-500 bg-red-50" 
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />
                  <Phone className="absolute left-3 top-3 text-gray-500" size={16} />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 pl-1"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="h-3 w-3 text-green-600 focus:ring-2 rounded mr-2"
                />
                <label className="text-xs text-gray-700">I agree to the terms</label>
              </div>

              <button
                type="submit"
                className="w-full py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-300 flex justify-center items-center"
              >
                <UserPlus className="mr-1" size={14} />
                Register
              </button>
            </form>

            <div className="text-center mt-4 text-xs text-gray-600">
              Already have an account? 
              <button 
                onClick={handleSignIn}
                className="ml-1 text-green-600 hover:text-green-800 font-semibold transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal 
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            onSignIn={handleSignIn}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SignupFormWithImage;