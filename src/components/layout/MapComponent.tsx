import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MapComponent: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once when in view
    threshold: 0.1, // Adjust visibility threshold (10% visible)
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-green-50 p-8 shadow-lg">
      {/* Address Section */}
      <motion.div
        ref={ref}
        className="w-full md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Address</h2>
        <p className="text-gray-600">
          123 Creative Street, Art District,
          <br />
          New York, NY 10001
        </p>
      </motion.div>

      {/* Map Section */}
      <motion.div
        ref={ref}
        className="w-full md:w-1/2 h-64 md:h-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345091544!2d-122.42180848468193!3d37.77851977975752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808581f68e7c91cb%3A0xab5a1a1b74f700a4!2s123%20Creative%20St%2C%20San%20Francisco%2C%20CA%2094124!5e0!3m2!1sen!2sus!4v1680992022583!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

export default MapComponent;
