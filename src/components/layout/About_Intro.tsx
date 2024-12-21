import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

const AboutIntro: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: { rotate: -2, scale: 1.05 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
      className="flex flex-row justify-center items-center mx-16 h-[100vh]"
    >
      {/* Left Section */}
      <motion.div
        className="flex flex-col w-1/2 justify-center gap-4"
        variants={textVariants}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-green-800 font-bold text-5xl"
          variants={textVariants}
        >
          Excellence in Artistic Crafts
        </motion.p>
        <motion.div
          className="text-gray-600 font-bold text-xl"
          variants={textVariants}
        >
          Decorate your home and life with the magic of our handmade goodness
        </motion.div>
        <motion.button
          className="bg-green-600 text-white p-3 w-1/3 rounded-3xl mt-4 flex items-center justify-center gap-2"
          variants={buttonVariants}
          whileHover="hover"
          transition={{ duration: 0.2 }}
        >
          <FaShoppingCart />
          Shop now
        </motion.button>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="w-1/4 h-[80vh] justify-center items-center py-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <img src="assets/A2.png" className="w-full h-full object-fit" alt="Artistic Crafts" />
      </motion.div>
    </motion.div>
  );
};

export default AboutIntro;
