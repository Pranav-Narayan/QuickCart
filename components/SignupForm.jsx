import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { RiCloseLargeLine } from "react-icons/ri";
import { FaGoogle, FaApple, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAppContext } from "@/context/AppContext";

const SignupForm = () => {

    const { showSignup, onLogin, onSignup } = useAppContext();
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        Username: "",
        Email: "",
        Password: ""
    })

    const SignupHandle = async () => {
        try {
            await axios.post('/api/authentication/signup', user)
            console.log("Signup successful...")
            toast.success("Signup successful!")
            setUser({ Username: "", Password: "", Email: "" })
            onSignup()
        } catch (error) {
            toast.error("Signup Failed...! Try again")
        }
    }

    return (
        <AnimatePresence>
            {showSignup && (
                <motion.div
                    className='h-screen w-screen fixed bg-black/75 z-[1000] top-0 flex justify-center items-center'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col uppercase bg-white p-5 md:p-10 lg:p-16 gap-8 relative rounded-xl  ">
                        <RiCloseLargeLine
                            className='text-2xl absolute top-3 right-5 cursor-pointer'
                            onClick={onSignup}
                        />
                        <h1 className='text-center text-2xl font-bold'>Signup</h1>
                        <div className="flex flex-col gap-2 lg:w-[20vw]">
                            <label className='text-black-500'>Username</label>
                            <input type="text" className='border-b-2 border-black outline-none'
                                value={user.Username}
                                onChange={(e) => setUser({ ...user, Username: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className='text-black-500'>Email</label>
                            <input type="email" className='border-b-2 border-black outline-none'
                                value={user.Email}
                                onChange={(e) => setUser({ ...user, Email: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Password</label>
                            <div className='border-b-2 border-black relative'>
                                <input type={showPassword ? "text" : "password"} className='w-full outline-none'
                                    value={user.Password}
                                    onChange={(e) => setUser({ ...user, Password: e.target.value })}
                                />
                                <span className='absolute top-0 right-0' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <button className='bg-orange-500 py-2 px-8 text-white rounded-2xl text-lg'
                                onClick={SignupHandle}
                            >Signup</button>
                        </div>
                        <div className='flex text-sm justify-between lowercase text-blue-600 cursor-pointer'>
                            <p onClick={onLogin}>Already have Account</p>

                        </div>
                        <div className='flex justify-center items-center gap-2 border-2 border-black/30 py-1 rounded-xl'>
                            <img src="/google.png" alt="" className='w-4 h-4' />
                            <button>Signup With Google</button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SignupForm