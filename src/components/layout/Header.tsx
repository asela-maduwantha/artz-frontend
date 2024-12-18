import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-600">
          <Link to="/">Artz by Usha</Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-800 hover:text-green-600 transition">
            Home
          </Link>
          <Link to="/ProductPage" className="text-gray-800 hover:text-green-600 transition">
            Products
          </Link>
          <Link to="/AboutPage" className="text-gray-800 hover:text-green-600 transition">
            About
          </Link>
          <Link to="/ContactPage" className="text-gray-800 hover:text-green-600 transition">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-800 hover:text-green-600">
            <ShoppingCart />
          </button>
          <button className="md:hidden text-gray-800 hover:text-green-600">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
