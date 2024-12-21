import React from 'react';
import { motion, useInView } from 'framer-motion';

const AboutReview: React.FC = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="h-[100vh] w-[90vw] flex justify-center items-center">
            <div className="flex justify-center items-center w-[90%] h-[70vh]">
                <motion.div
                    ref={ref}
                    className="w-1/2 h-full flex justify-center items-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src="assets/A4.png"
                        className="h-[80vh] w-2/3 object-fit"
                        alt="Customer Feedback"
                    />
                </motion.div>
                <motion.div
                    className="w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    <p className="text-4xl font-bold text-green-600">
                        We have good customer feedbacks!
                    </p>
                    <div className="mt-10 text-gray-500">
                        Join the hundreds of satisfied customers who love our services! 
                        From exceptional quality to unmatched support, 
                        we prioritize delivering an outstanding experience. 
                        Don't just take our word for it, our customer stories speak volumes! 
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutReview;
