import React from 'react'
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

const SearchProducts = ({ close }) => {
  return (
    <motion.div className='bg-black/80 h-[100vh] fixed top-0 w-full z-50 flex px-32 pt-28'
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex flex-col items-center">
        <h1 className='text-white text-[35px]'>Search Products</h1>
        <div className='w-full flex justify-center gap-4'>
          <div className='w-2/4 flex justify-center relative'>
            <input type="text" className='w-full h-10 px-10' />
            <IoClose className='absolute right-2 top-1 text-3xl' />
          </div>
          <button className='px-5 bg-orange-500 text-white' onClick={close}>close</button>
        </div>
      </div>
    </motion.div>
  )
}

export default SearchProducts