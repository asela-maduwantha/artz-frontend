import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wishlistService } from "../../services/api/wishlistservice";

interface HeartProps {
    productId: string | number;
}

const Heart: React.FC<HeartProps> = ({ productId }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleHeartClick = async (e: React.MouseEvent) => {
        e.stopPropagation(); 

        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error("Please log in to manage your wishlist.");
            return;
        }

        setIsFavorited((prev) => !prev);

        if (!isFavorited) {
            try {
                await wishlistService.addItemToWishlist(Number(userId), { productId: Number(productId) });
                toast.success(`Product ${productId} added to wishlist!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                toast.error("Failed to add to wishlist.");
            }
        } else {
            try {
                await wishlistService.removeWishlistItem(Number(userId), Number(productId));
                toast.info(`Product ${productId} removed from wishlist`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                toast.error("Failed to remove from wishlist.");
            }
        }
    };

    return (
        <div
            className="relative flex items-center justify-center group"
            onMouseEnter={(e) => e.stopPropagation()} 
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
