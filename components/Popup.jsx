'use client'
import React from 'react'
import { useAppContext } from "@/context/AppContext";

const Popup = ({ ProductId, onClose }) => {
    const { removeCartItem } = useAppContext();
    // console.log("Hello====",ProductId)
    return (
        <div className='fixed h-full w-full bg-black/50 top-0 left-0 flex items-center justify-center'>
            <div className='bg-white px-10 py-5 flex flex-col gap-4 rounded-xl'>
                <p className='text-lg py-5'>Do you want to Remove item from Cart</p>
                <div className='flex gap-2'>
                    <button className='border-2 px-4 py-1 bg-orange-400 rounded-md'
                        onClick={() => { removeCartItem(ProductId); onClose() }}
                    >Confirm</button>
                    <button className='border-2 px-4 py-1 bg-orange-400 rounded-md'
                        onClick={() => { onClose(); }}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Popup