import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Homepage';
import ProductPage from '../pages/ProductPage';
import AboutPage from '../pages/AboutPage';
import ContactsPage from '../pages/ContactsPage';



const AppRoutes: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
       
    
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ProductPage" element={<ProductPage />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/ContactsPage" element={<ContactsPage />} />
            
          </Routes>
        
      </div>
    </Router>
  );
};

export default AppRoutes;