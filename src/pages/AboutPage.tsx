import React from 'react';
import Header from '../components/layout/Header';
import AboutIntro from '../components/layout/About_Intro';
import AboutDes from '../components/layout/AboutDes';
import AboutReview from '../components/layout/About_Review';
import Footer from '../components/layout/Footer';


const AboutPage: React.FC = () => {
  return (
    <div>
      <Header />
      <AboutIntro/>
      <AboutDes/>
      <AboutReview/>
      <div className='h-0.5 bg-green-500 my-6'></div>
      <Footer/>
    </div>
  );
};

export default AboutPage;