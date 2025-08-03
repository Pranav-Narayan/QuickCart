'use client'
import React from 'react'
import Navbar from '@/components/Navbar';
import { IoBagOutline } from "react-icons/io5";
import { FaHeart, FaIdCard, FaShippingFast } from "react-icons/fa";
import { MdLockOutline, MdOutlinePayment } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import Profile from '@/components/Profile';
import { useAppContext } from "@/context/AppContext";

const page = () => {

    const { userName } = useAppContext();

    return (
        <>
            <Navbar />
            <div className='mt-10 px-32'>
                <h1 className='text-center text-3xl font-semibold mb-10'>My Account</h1>
                <div className='flex gap-8'>
                    <div className="flex-none w-80 flex flex-col gap-4">
                        <div className="flex gap-4 items-center bg-neutral-50 shadow-md px-5 py-4">
                            <div className='bg-black text-white w-5 h-5 rounded-full flex items-center justify-center p-5 text-2xl'>{userName?.charAt(0).toUpperCase() + userName?.slice(1, 2)}</div>
                            <div className="flex flex-col">
                                <span>Hi,</span>
                                <h2 className='font-semibold text-lg'>{userName}</h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 shadow-md px-5 py-2">
                            <span><FaIdCard /></span>
                            <span>My Account</span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 shadow-md px-5 py-2">
                            <span><IoBagOutline /></span>
                            <span>My Orders</span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 shadow-md px-5 py-2">
                            <span><FaHeart /></span>
                            <span>My Wishlist</span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 shadow-md px-5 py-2">
                            <span><MdLockOutline /></span>
                            <span>Change Password</span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 shadow-md px-5 py-2 cursor-pointer">
                            <span><FaShippingFast /></span>
                            <span>Shipping Address</span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 shadow-md px-5 py-2 cursor-pointer">
                            <span><MdOutlinePayment /></span>
                            <span>Payment Methods</span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 shadow-md px-5 py-2 cursor-pointer">
                            <span><GoSignOut /></span>
                            <span>Logout</span>
                        </div>
                    </div>
                    <div className='flex-1 bg-neutral-50 shadow-md p-16'>
                        <Profile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page