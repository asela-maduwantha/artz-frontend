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
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your account has been created successfully. 
          You can now sign in and start exploring.
        </p>
        <div className="flex space-x-4 justify-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button 
            onClick={onSignIn}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
          >
            <LogIn className="mr-2" size={20} />
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
        <label className="block text-base font-semibold mb-3 text-gray-700">{label}</label>
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
            className={`w-full px-5 py-3 pl-12 ${type === 'password' ? 'pr-16' : ''} text-base border-2 rounded-xl focus:outline-none transition-all duration-300 ${
              error 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 focus:border-green-600"
            }`}
          />
          <Icon className="absolute left-4 top-4 text-gray-500" size={20} />
          
          {type === 'password' && (
            <button
              type="button"
              onClick={() => togglePasswordVisibility(name as 'password' | 'confirmPassword')}
              className="absolute right-4 top-4 text-gray-500 hover:text-green-600 transition-colors"
            >
              {showPassword[name as 'password' | 'confirmPassword'] 
                ? <EyeOff size={20} /> 
                : <Eye size={20} />
              }
            </button>
          )}
          
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm mt-2 pl-2"
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
    // In a real application, this would navigate to the sign-in page
    alert('Navigate to Sign In Page');
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left side - Background image */}
        <div
          className="w-2/5 bg-cover bg-center hidden lg:block"
          style={{ backgroundImage: "url('/Arts.avif')" }}
        >
          <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold text-center p-6">
              Create Your Account
            </h1>
          </div>
        </div>

        {/* Right side form */}
        <div className="w-full lg:w-3/5 bg-white py-16 px-4 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-gray-50 rounded-2xl p-12 shadow-xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Sign Up</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderInputField("fullName", "Full Name", "text", User)}
              {renderInputField("email", "Email Address", "email", Mail)}
              {renderInputField("password", "Password", "password", Lock)}
              {renderInputField("confirmPassword", "Confirm Password", "password", Lock)}
              
              <div>
                <label className="block text-base font-semibold mb-3 text-gray-700">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={`w-full px-5 py-3 pl-12 text-base border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                      errors.phone 
                        ? "border-red-500 bg-red-50" 
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />
                  <Phone className="absolute left-4 top-4 text-gray-500" size={20} />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-2 pl-2"
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
                  className="h-4 w-4 text-green-600 focus:ring-2 rounded mr-2"
                />
                <label className="text-sm text-gray-700">I agree to the terms</label>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-base rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-300 flex justify-center items-center"
              >
                <UserPlus className="mr-2" size={20} />
                Register
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-600">
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