import React from 'react';
import Header from '../components/layout/Header';
import AboutIntro from '../components/layout/About_Intro';


const AboutPage: React.FC = () => {
  return (
    <div>
      <Header />
      <AboutIntro/>
    </div>
  );
};

export default AboutPage;