import React from 'react';
import {  Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-600">Artz by Usha</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-800 hover:text-green-600 transition">Home</a>
          <a href="#" className="text-gray-800 hover:text-green-600 transition">Products</a>
          <a href="#" className="text-gray-800 hover:text-green-600 transition">About</a>
          <a href="#" className="text-gray-800 hover:text-green-600 transition">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link 
            to="/login"
            className="px-4 py-2 text-gray-800 hover:text-green-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
          
          <button className="md:hidden text-gray-800 hover:text-green-600">
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;