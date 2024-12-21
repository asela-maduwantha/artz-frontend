import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const AboutDes: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });
    const controls = useAnimation();

    // Trigger big animations when elements come into view
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    return (
        <div className="relative bg-green-500" ref={ref}>
            <div className="w-[80vw] h-[100vh] flex justify-center">
                {/* Content Section */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, x: -100 },
                        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
                    }}
                    className="flex flex-col justify-center w-1/2 mb-[35vh] mr-[20vw]"
                >
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
                        }}
                        className="text-3xl font-bold text-white"
                    >
                        Depot of Unique Handcrafts!
                    </motion.p>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.4 } },
                        }}
                        className="mt-4 text-white"
                    >
                        Artz by Usha, A collection of exquisite, handmade crafts that bring creativity, passion, and uniqueness into your space. From intricate designs to vibrant expressions, each piece tells a story of artistic brilliance.
                    </motion.div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
                    }}
                    className="absolute inset-0 flex justify-center items-center"
                >
                    <div className="h-2/3 w-1/2 ml-[20vw]">
                        <motion.img
                            src="assets/A3.png"
                            alt="Overlay"
                            className="object-fit h-full w-full"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.6 } },
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutDes;
