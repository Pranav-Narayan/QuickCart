'use client'
import React, { useState, useMemo } from 'react'
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';
import { productsDummyData } from "@/assets/assets";

const SearchProducts = ({ close }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];
    return productsDummyData.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <motion.div className='bg-black/80 h-[100vh] fixed top-0 w-full z-50 flex px-32 pt-28'
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex flex-col items-center">
        <h1 className='text-white text-[35px] mb-5'>Search Products</h1>

        <div className='w-full flex justify-center gap-4'>
          <div className='w-2/4 flex justify-center relative'>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name"
              className='w-full h-10 px-4 rounded'
            />
            <IoClose
              className='absolute right-2 top-2 text-2xl cursor-pointer'
              onClick={() => setSearchQuery("")}
            />
          </div>
          <button className='px-5 bg-orange-500 text-white' onClick={close}>Close</button>
        </div>
        <div className='w-3/4 bg-white mt-6 rounded grid gap-2'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              console.log("Product image ==", product.image[0])
              return (
                <a key={product._id} className='flex items-center gap-10 border-b p-2 border-black/50' href={`/product/${product._id}`}>
                  <img src={product.image[0]} alt="" className='h-20 w-20' />
                  <p>{product.name}</p>
                </a>
              )
            })
          ) : (
            searchQuery && <p>No products found.</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchProducts;
