import React from 'react';
import Header from '../components/layout/Header';
import AboutIntro from '../components/layout/About_Intro';
import AboutDes from '../components/layout/AboutDes';
import Footer from '../components/layout/Footer';


const AboutPage: React.FC = () => {
  return (
    <div>
      <Header />
      <AboutIntro/>
      <AboutDes/>
      <Footer/>
    </div>
  );
};

export default AboutPage;