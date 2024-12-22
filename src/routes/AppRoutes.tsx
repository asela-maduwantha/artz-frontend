import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your existing components
import HomePage from '../pages/Homepage';
import LoginForm from '../components/login/login';
import SignupFormWithImage from '../components/signup/UserSignupForm';
import AdminLayout from '../components/layout/AdminLayout';
import Product from '../components/Admin/Product';
import ProductDisplay from '../components/Admin/ProductDisplay';
import ContactsPage from '../pages/ContactsPage';
import AboutPage from '../pages/AboutPage';
import ProductPage from '../pages/ProductPage';
import DiscountManagement from '../components/Admin/DiscountManagement';
import CustomerLayout from '../components/layout/Customerlayout';
import CartPage from '../pages/CartPage';
import WishlistPage from '../pages/WishlistPage';
import OrdersPage from '../pages/OrdersPage';
import CheckoutPage from '../pages/CheckoutPage';
import AdminOrdersPage from '../pages/AdminOrdersPage';
import PaymentDashboard from '../pages/PaymentDashboard';

// Create a ProtectedRoute component for authentication
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes with MainLayout */}
        
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupFormWithImage />} />
          <Route path="/contact" element={<ContactsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ProductPage />} />


        {/* Protected Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/product" replace />} />
          <Route path="product" element={<Product />} />
          <Route path="allproduct" element={<ProductDisplay />} />
          <Route path="discounts" element={<DiscountManagement />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="payments" element={<PaymentDashboard />} />
        </Route>

        {/* Protected Customer routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/customer/orders" replace />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        {/* Checkout route with protection */}
        <Route
          path="/artbyusha/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;