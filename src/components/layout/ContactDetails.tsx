import React, { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedSection: React.FC<{
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animationVariants: any;
}> = ({ children, animationVariants }) => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    return (
        <motion.div ref={ref} initial="hidden" animate={controls} variants={animationVariants}>
            {children}
        </motion.div>
    );
};

const ContactDetails: React.FC = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="bg-white p-8 shadow-lg">
            {/* Heading Section */}
            <AnimatedSection animationVariants={fadeInUp}>
                <div className="flex flex-col justify-center items-center text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-800">Contact Us</h1>
                    <p className="mt-4 text-xl text-gray-600 w-[70vw]">
                        We're here to help! Feel free to reach out to us for any inquiries, suggestions, or feedback. We’re always eager to hear from you. Your input helps us improve and provide the best experience possible. We’re just a message or call away!
                    </p>
                </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection animationVariants={fadeIn}>
                <div className="text-center mb-8 mt-[20vh]">
                    <h2 className="text-xl font-semibold text-green-800">Contact Information</h2>
                    <div className="flex justify-center items-center gap-8 mt-6">
                        <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-green-500" />
                            <span className="text-gray-700">+1 234 567 890</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaEnvelope className="text-green-500" />
                            <span className="text-gray-700">info@example.com</span>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Subscribe Section */}
            <AnimatedSection animationVariants={fadeInUp}>
                <div className="text-center mb-12 mt-[20vh]">
                    <h2 className="text-xl font-semibold text-green-800">Subscribe to our updates!</h2>
                    <div className="mt-10 flex justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email address here."
                            className="w-2/3 max-w-md px-4 py-2 border border-gray-300 rounded-l-3xl focus:outline-none"
                        />
                        <button className="px-6 py-2 bg-green-500 text-white rounded-r-3xl hover:bg-green-600">
                            Submit your email address
                        </button>
                    </div>
                </div>
            </AnimatedSection>

            {/* Divider */}
            <AnimatedSection animationVariants={scaleIn}>
                <div className="w-full h-1 bg-green-500 mt-16"></div>
            </AnimatedSection>

            {/* Social Media Icons */}
            <AnimatedSection animationVariants={fadeIn}>
                <div className="flex justify-center gap-10 my-16">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-pink-600 text-2xl hover:text-pink-800" />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="text-gray-800 text-2xl hover:text-black" />
                    </a>
                </div>
            </AnimatedSection>
        </div>
    );
};

export default ContactDetails;
