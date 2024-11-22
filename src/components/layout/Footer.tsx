import React from 'react';
import { Facebook, Instagram, Twitter, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center text-xl font-bold text-green-600 mb-4">
            <Leaf className="mr-2" /> Artz by Usha
          </div>
          <p className="text-gray-600">
            Unique, handcrafted gifts that tell your story
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <a href="#" className="text-gray-700 hover:text-green-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Products</a>
            <a href="#" className="text-gray-700 hover:text-green-600">About</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Contact</a>
          </nav>
        </div>

        {/* Customer Service Section */}
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <nav className="space-y-2">
            <a href="#" className="text-gray-700 hover:text-green-600">FAQ</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Shipping</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Returns</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Support</a>
          </nav>
        </div>

        {/* Social Media Links Section */}
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-green-600"><Facebook /></a>
            <a href="#" className="text-gray-700 hover:text-green-600"><Instagram /></a>
            <a href="#" className="text-gray-700 hover:text-green-600"><Twitter /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-8 border-t pt-4 text-gray-600">
        © 2024 Artz by Usha. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
