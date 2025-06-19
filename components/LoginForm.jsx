"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RiCloseLargeLine } from "react-icons/ri";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login = ({ showLogin, onClose }) => {

    const router = useRouter()
    const [user, setUser] = useState({
        Email: "",
        Password: ""
    })

    const onLogin = async () => {
        try {
            await axios.post('api/authentication/login', user)
            toast.success('Login successful!');
            onClose();
            router.refresh();

        } catch (error) {
            console.log("Error in Login Button Click :: ", error)
            toast.error('Login failed! Please check your credentials.');
        }
    }

    return (
        <AnimatePresence>
            {showLogin && (
                <motion.div
                    className='h-screen w-screen fixed bg-black/75 z-[1000] top-0 flex justify-center items-center'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col uppercase bg-white p-5 md:p-10 lg:p-16 gap-8 relative rounded-xl  ">
                        <RiCloseLargeLine
                            onClick={onClose}
                            className='text-2xl absolute top-3 right-5 cursor-pointer'
                        />
                        <h1 className='text-center text-2xl font-bold'>Login</h1>
                        <div className="flex flex-col gap-2">
                            <label className='text-black-500'>Email</label>
                            <input type="email" className='border-b-2 border-black outline-none'
                                value={user.Email}
                                onChange={(e) => setUser({ ...user, Email: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Password</label>
                            <div className='border-b-2 border-black'>
                                <input type="password" className='w-full outline-none'
                                    value={user.Password}
                                    onChange={(e) => setUser({ ...user, Password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <button className='bg-orange-500 py-2 px-8 text-white rounded-2xl text-lg' onClick={onLogin}>Login</button>
                        </div>
                        <div className='flex text-sm justify-between lowercase text-blue-600 cursor-pointer'>
                            <p>Don't have Account</p>
                            <p>Forgot Password</p>
                        </div>
                        <div className='flex justify-center gap-1 text-2xl'>
                            <FaGoogle />
                            <FaApple />
                            <FaFacebookF />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Login;
