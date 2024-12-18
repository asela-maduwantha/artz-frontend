import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomePage from '../pages/Homepage';
import LoginForm from '../components/login/login';
import SignupFormWithImage from '../components/signup/UserSignupForm';
import AdminLayout from '../components/layout/AdminLayout';
import Product from '../components/Admin/Product';
import ProductDisplay from '../components/Admin/ProductDisplay';



const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
       
    
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/signup" element={<SignupFormWithImage/>} />
            <Route path="/admin" element={<AdminLayout/>} >
            <Route path="product" element={< Product/>} />
            <Route path="allproduct" element={< ProductDisplay/>} />
            </Route>
            
          
           
          </Routes>
        
      </div>
    </Router>
  );
};

export default AppRoutes;