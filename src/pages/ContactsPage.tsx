import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ContactDetails from '../components/layout/ContactDetails';
import MapComponent from '../components/layout/MapComponent';

const ContactsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <ContactDetails />
        <MapComponent />
      </main>
      <Footer />
    </div>
  );
};

export default ContactsPage;
