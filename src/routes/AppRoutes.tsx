import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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



const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
       
    
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/signup" element={<SignupFormWithImage/>} />
            <Route path="/contact" element={<ContactsPage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/shop" element={<ProductPage/>} />
           
            <Route path="/admin" element={<AdminLayout/>} >
            <Route path="product" element={< Product/>} />
            <Route path="allproduct" element={< ProductDisplay/>} />
            <Route path="discounts" element={<DiscountManagement/>} />
            </Route>
            <Route path="/customer" element={<CustomerLayout/>} >
            <Route path="cart" element={< CartPage/>} />
            <Route path="wishlist" element={< WishlistPage/>} />
            <Route path="orders" element={<OrdersPage/>} />
            </Route>
          
           
          </Routes>
        
      </div>
    </Router>
  );
};

export default AppRoutes;