import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';
import { authService } from "../../services/api/authservice";
import { 
  User, Mail, Lock, Phone, UserPlus, Eye, EyeOff,
  CheckCircle, LogIn, MapPin 
} from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
  termsAccepted: boolean;
}


interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type ValidationRule<T> = (value: T) => string;

interface ValidationRules {
  firstName: ValidationRule<string>;
  lastName: ValidationRule<string>;
  email: ValidationRule<string>;
  password: ValidationRule<string>;
  confirmPassword: ValidationRule<string>;
  address: ValidationRule<string>;
  phone: ValidationRule<string>;
  termsAccepted: ValidationRule<boolean>;
}
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl p-4 max-w-sm w-full text-center"
      >
        <CheckCircle className="mx-auto text-green-600 mb-2" size={32} />
        <h2 className="text-lg font-bold mb-2 text-gray-800">Registration Successful!</h2>
        <p className="text-gray-600 mb-2 text-sm">Your account has been created successfully.</p>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center mx-auto text-sm"
        >
          <LogIn className="mr-1" size={14} />
          Continue
        </button>
      </motion.div>
    </div>
  );
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", password: "", 
    confirmPassword: "", address: "", phone: "", termsAccepted: false,
  });
  
  const [errors, setErrors] = useState<{[key in keyof FormData]: string}>({
    firstName: "", lastName: "", email: "", password: "", 
    confirmPassword: "", address: "", phone: "", termsAccepted: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationRules: ValidationRules = useMemo(() => ({
    firstName: (value: string) => !value.trim() ? "Required" : "",
    lastName: (value: string) => !value.trim() ? "Required" : "",
    email: (value: string) => {
      if (!value.trim()) return "Required";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email";
    },
    password: (value: string) => {
      if (!value) return "Required";
      if (value.length < 8) return "Min 8 chars";
      if (!/[A-Z]/.test(value)) return "Need uppercase";
      if (!/[0-9]/.test(value)) return "Need number";
      if (!/[!@#$%^&*]/.test(value)) return "Need special char";
      return "";
    },
    confirmPassword: (value: string) => {
      if (!value) return "Required";
      return value === formData.password ? "" : "Passwords don't match";
    },
    address: (value: string) => !value.trim() ? "Required" : "",
    phone: (value: string) => {
      if (!value.trim()) return "Required";
      return /^\+?([0-9]{2})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value) ? "" : "Invalid format";
    },
    termsAccepted: (value: boolean) => value ? "" : "Must accept terms",
  }), [formData.password]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    
    const validationRule = validationRules[name as keyof ValidationRules];
    if (validationRule) {
      // Properly type the validation by checking the field type
      let validationValue: string | boolean;
      if (type === "checkbox") {
        validationValue = checked;
      } else {
        validationValue = value;
      }
      
      const error = validationRule(validationValue as never);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validationRules]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create new errors object with proper typing
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const validationRule = validationRules[key as keyof ValidationRules];
      const value = formData[key as keyof FormData];
      acc[key as keyof FormData] = validationRule(value as never);
      return acc;
    }, {} as { [key in keyof FormData]: string });

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      try {
        await authService.signup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          phoneNumber: formData.phone
        });

        setShowSuccessModal(true);
        
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/customer');
        }

       
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-cover bg-center hidden lg:block" 
           style={{ backgroundImage: "url('/Arts.avif')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-xl font-bold">Create Your Account</h1>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* First row */}
            <div className="space-y-1">
              <label className="text-sm font-medium">First Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-8 text-sm border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="First Name"
                />
                <User className="absolute left-2 top-2.5 text-gray-400" size={16} />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Last Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-8 text-sm border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Last Name"
                />
                <User className="absolute left-2 top-2.5 text-gray-400" size={16} />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Second row */}
            <div className="space-y-1 col-span-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-8 text-sm border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Email Address"
                />
                <Mail className="absolute left-2 top-2.5 text-gray-400" size={16} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Third row */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-8 pr-8 text-sm border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Password"
                />
                <Lock className="absolute left-2 top-2.5 text-gray-400" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                  className="absolute right-2 top-2.5 text-gray-400"
                >
                  {showPassword.password ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-8 pr-8 text-sm border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Confirm Password"
                />
                <Lock className="absolute left-2 top-2.5 text-gray-400" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                  className="absolute right-2 top-2.5 text-gray-400"
                >
                  {showPassword.confirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Fourth row */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-8 text-sm border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Phone Number"
                />
                <Phone className="absolute left-2 top-2.5 text-gray-400" size={16} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Address</label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-8 text-sm border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Address"
                />
                <MapPin className="absolute left-2 top-2.5 text-gray-400" size={16} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Fifth row */}
            <div className="col-span-2 flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 rounded border-gray-300"
              />
              <label className="text-sm text-gray-600">
                I agree to the <a href="/terms" className="text-green-600 hover:underline">Terms</a> and <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`col-span-2 py-2 px-4 rounded ${
                isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } text-white flex items-center justify-center space-x-2 transition-colors`}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <><UserPlus size={16} />
                <span>Create Account</span>
              </>
            )}
          </button>

          {/* Login link */}
          <div className="col-span-2 text-center mt-4">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* Success Modal */}
    <AnimatePresence>
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            const userRole = localStorage.getItem('userRole');
            if (userRole === 'ADMIN') {
              navigate('/admin');
            } else {
              navigate('/customer');
            }
          }}
        />
      )}
    </AnimatePresence>
  </div>
);
};

export default SignupForm;