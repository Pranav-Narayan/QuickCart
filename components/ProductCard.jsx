"use client"
import React, { useEffect, useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProductCard = ({ product }) => {
    const router = useRouter()
    const { currency, userName, Email, onLogin, fetchWishlistData, wishlistItems } = useAppContext()
    const [addedtoWishlist, setWishlist] = useState(false);

    useEffect(() => {
        if (Email) {
            fetchWishlistData();
        }
    }, [Email, addedtoWishlist]);

    const isinWishlist = wishlistItems.includes(product._id)

    const addWishlist = async () => {
        if (!userName) {
            onLogin();
            return;
        }

        try {
            await axios.post('/api/cart/updateWishlist/add', { product, Email });

            toast.success(addedtoWishlist ? "Removed From Wishlist" : "Added To Wishlist");
            setWishlist(!addedtoWishlist);
        } catch (error) {
            console.error("Wishlist update failed:", error);
        }
    };


    return (
        <div className='relative'>
            <button
                className="absolute top-2 right-2 z-40 bg-white p-2 rounded-full shadow-md"
                onClick={addWishlist}
            >
                <motion.div
                    key={isinWishlist ? 'loved' : 'not-loved'}
                    initial={{ scale: 1.5, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                    <Image
                        className="h-3 w-3"
                        src={isinWishlist ? assets.love : assets.heart_icon}
                        alt="heart_icon"
                    />
                </motion.div>
            </button>

            <div
                onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
                className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
            >
                <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                    <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                        width={800}
                        height={800}
                    />

                </div>

                <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
                <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
                <div className="flex items-center gap-2">
                    <p className="text-xs">{4.5}</p>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                className="h-3 w-3"
                                src={
                                    index < Math.floor(4)
                                        ? assets.star_icon
                                        : assets.star_dull_icon
                                }
                                alt="star_icon"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-end justify-between w-full mt-1">
                    <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                    <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard