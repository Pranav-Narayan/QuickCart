"use client"
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Login from "./LoginForm";

const Navbar = () => {
  const { isSeller, router, userName } = useAppContext();
  const [showLogin, setShowLogin] = useState(false)
  const onLogin = () => {
    setShowLogin(true)
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
          <Link href="/" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            Contact
          </Link>

          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

        </div>

        <ul className="hidden md:flex items-center gap-4 " >
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
          <button className="flex items-center gap-2 hover:text-gray-900 transition" onClick={onLogin}>
            <Image src={assets.user_icon} alt="user icon" />
            {userName ? "Profile" : "Account"}
          </button>
        </ul>

        <div className="flex items-center md:hidden gap-3">
          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
          <button className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            {userName ? "Profile" : "Account"}
          </button>
        </div>
      </nav >
      <Login showLogin={showLogin} onClose={() => setShowLogin(false)} />

    </>
  );
};

export default Navbar;