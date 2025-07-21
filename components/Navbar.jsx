"use client"
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Login from "./LoginForm";
import Signup from "./SignupForm";
import SearchProducts from "./SearchProducts";
import toast from 'react-hot-toast';
import axios from "axios";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isSeller, router, userName, onLogin, onSignup, cartItems, fetchCartData } = useAppContext();
  const [dropDown, setDropDown] = useState(false);
  const [showSearchbar, setShowsearchbar] = useState(false)

  useEffect(() => {
    fetchCartData()
  }, [userName])


  const onLogout = async () => {
    try {
      await axios.post("/api/authentication/logout")
      window.location.href = '/';
      toast.success("Logout successful")
    } catch (error) {
      console.log("Logout Error ::", error)
      toast.error("Logout Failed ! Try again")
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <a href="/all-products" className="hover:text-gray-900 transition">
            Shop
          </a>
          <a href="/aboutus" className="hover:text-gray-900 transition">
            About Us
          </a>
          <a href="/contact" className="hover:text-gray-900 transition">
            Contact
          </a>

          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

        </div>

        <ul className="hidden md:flex items-center gap-4 " >
          <Image className="w-5 h-5" src={assets.search_icon} alt="search icon" onClick={() => setShowsearchbar(true)} />
          {!userName
            ? (
              <button className="hover:text-gray-900 transition"
                onMouseEnter={() => setDropDown(true)}
                onMouseLeave={() => setDropDown(false)}
              >
                <div className="flex items-center gap-2 relative">
                  <Image src={assets.user_icon} alt="user icon" />
                  Account
                </div>
                {dropDown && (
                  <ul className="absolute px-8 py-5 z-50 bg-white shadow-xl flex flex-col gap-3">
                    <li className="hover:text-blue-700" onClick={onLogin}>Login</li>
                    <li className="hover:text-blue-700" onClick={onSignup}>Signup</li>
                  </ul>
                )}
              </button>)
            : (
              <button className="flex items-center justify-center gap-4">
                {/* <Image className="h-6 w-6" src={assets.love} alt="user" /> */}
                <div className="flex" onClick={() => router.push('/cart')}>
                  <Image className="h-6 w-6" src={assets.trolley} alt="user" />
                  {cartItems.length > 0 ? <span className="bg-black/75 text-white rounded-full h-2.5 w-2.5"></span> : <></>}
                </div>
                <div
                  onMouseEnter={() => setDropDown(true)}
                  onMouseLeave={() => setDropDown(false)}
                >
                  <div className="flex gap-2 relative">
                    <Image className="h-6 w-6" src={assets.user} alt="user" />
                    Profile
                  </div>
                  {dropDown && (
                    <ul className="absolute z-50 bg-white px-5 py-4 shadow-xl flex flex-col gap-3">
                      <li className="text-lg font-bold">Hey <br />{userName}</li>
                      <Link href="/account" className="hover:bg-black hover:text-white">Account</Link>
                      <li className="hover:bg-black hover:text-white">wishlist</li>
                      <li className="hover:bg-black hover:text-white">Contact Us</li>
                      <li className="hover:bg-black hover:text-white" onClick={onLogout}>Logout</li>
                    </ul>
                  )}
                </div>
              </button>
            )}

        </ul>

        <div className="flex items-center md:hidden gap-3">
          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
          <button className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            {userName ? "Profile" : "Account"}
          </button>
        </div>
      </nav >
      <Login />
      <Signup />
      <AnimatePresence>
        {showSearchbar && <SearchProducts close={() => { setShowsearchbar(false) }} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;