import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Heart: React.FC = () => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleHeartClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling to the parent element

        setIsFavorited((prev) => !prev);

        if (!isFavorited) {
            // Show notification when added to wishlist
            toast.success("Added to wishlist!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            // Show notification when removed from wishlist
            toast.info("Removed from wishlist", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div
            className="relative flex items-center justify-center group"
            onMouseEnter={(e) => e.stopPropagation()} // Prevent propagation during hover
            onMouseLeave={(e) => e.stopPropagation()}
        >
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-green-600 bg-opacity-75 text-white text-xs rounded-md py-1 px-2">
                {isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            </div>


            {/* Heart Icon */}
            <motion.div
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
                onClick={handleHeartClick}
            >
                {isFavorited ? (
                    <AiFillHeart className="text-2xl text-red-500" />
                ) : (
                    <AiOutlineHeart className="text-2xl text-gray-500" />
                )}
            </motion.div>
        </div>
    );
};

export default Heart;
