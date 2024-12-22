import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Home, User, Heart, BookOpen, LogOut, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingBag, label: 'Shop', path: '/customer/shop' },
    { icon: ShoppingCart, label: 'Cart', path: '/customer/cart' },
    { icon: Heart, label: 'Wishlist', path: '/customer/wishlist' },
    { icon: BookOpen, label: 'Orders', path: '/customer/orders' },
    { icon: User, label: 'Profile', path: '/customer/profile' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Menu Button & Logo */}
            <div className="flex items-center gap-4">
              <button onClick={toggleSidebar} className="lg:hidden">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-green-500">ArtzByUsha</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 lg:hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold text-green-500">Menu</span>
                  <button onClick={toggleSidebar}>
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                <nav className="space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 p-2 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default CustomerLayout;