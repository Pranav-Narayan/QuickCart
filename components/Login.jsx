import React from 'react';
import { MdClose } from "react-icons/md";

const Login = ({ showLogin, onClose }) => {
    if (!showLogin) return null;

    return (
        <div className='h-screen w-screen fixed bg-black/75 z-[1000] top-0 flex justify-center items-center'>
            <div className="flex flex-col uppercase bg-white p-10 gap-8 relative">
                <MdClose
                    onClick={onClose}
                    className='absolute top-3 right-5 text-2xl cursor-pointer'
                />
                <h1 className='text-center text-2xl font-bold'>Login</h1>

                <div className='flex flex-col gap-2'>
                    <label>Email</label>
                    <input type="email" className='border-b-2 border-indigo-500 outline-none' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Password</label>
                    <input type="password" className='border-b-2 border-indigo-500 outline-none' />
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <button className='bg-blue-600 px-5 py-1 text-white rounded-md'>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
