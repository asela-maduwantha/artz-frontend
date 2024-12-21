import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled ? 'bg-white shadow-md' : 'bg-white/95'}
      ${isOpen ? 'h-screen md:h-auto bg-white' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-auto py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-green-600 z-50">
            Artz by Usha
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to='/' className="text-gray-800 hover:text-green-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/shop" className="text-gray-800 hover:text-green-600 transition-colors duration-200">
              Products
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-green-600 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-green-600 transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login"
              className="px-4 py-2 text-gray-800 hover:text-green-600 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-0 bg-white transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          pt-20`}
        >
          <nav className="h-full flex flex-col px-4">
            <div className="space-y-6 text-center pt-8">
              <a href="#" className="block text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                Home
              </a>
              <a href="#" className="block text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                Products
              </a>
              <a href="#" className="block text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                About
              </a>
              <a href="#" className="block text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                Contact
              </a>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="mt-auto pb-8 space-y-4 w-full px-4">
              <Link 
                to="/login"
                className="block w-full py-3 text-center text-gray-800 hover:text-green-600 
                border border-gray-200 rounded-full transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full py-3 text-center bg-green-600 text-white 
                rounded-full hover:bg-green-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;