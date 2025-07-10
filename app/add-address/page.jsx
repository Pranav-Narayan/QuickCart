'use client'

import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const AddAddress = () => {
    const router = useRouter()
    const { Email } = useAppContext();
    const [disableButton, ShowDisable] = useState(true)
    const [address, setAddress] = useState({
        Email,
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    useEffect(() => {
        if (address.fullName.length > 0 & address.phoneNumber.length > 0 & address.pincode.length > 0 &
            address.area.length > 0 & address.city.length > 0 & address.state.length > 0) {
            ShowDisable(false)
        }
        else {
            ShowDisable(true)
        }
    }, [address])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/cart/updateAddress', address)
            toast.success('Address Updated..!')
            router.refresh()
            router.back()
        } catch (error) {
            console.log("Error in Update of shipping Address")
            toast.error("Failed to Update Shipping Address, Try Again !")
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <form className="w-full">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-orange-600">Address</span>
                    </p>
                    <div className="space-y-3 max-w-sm mt-10">
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-black"
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-black"
                            type="text"
                            placeholder="Phone number"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-black"
                            type="text"
                            placeholder="Pin code"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            value={address.pincode}
                        />
                        <textarea
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-black resize-none"
                            type="text"
                            rows={4}
                            placeholder="Address (Area and Street)"
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            value={address.area}
                        ></textarea>
                        <div className="flex space-x-3">
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-black"
                                type="text"
                                placeholder="City/District/Town"
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                value={address.city}
                            />
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-black"
                                type="text"
                                placeholder="State"
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                value={address.state}
                            />
                        </div>
                    </div>
                    <button type="submit" onClick={onSubmitHandler} disabled={disableButton} className={`${disableButton ? "bg-orange-600/50 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"} max-w-sm w-full mt-6 text-white py-3 uppercase`}>
                        Save address
                    </button>
                    <button type="button" onClick={() => router.back()} className="group flex items-center mt-6 gap-2 text-orange-600">
                        <Image
                            className="group-hover:-translate-x-1 transition"
                            src={assets.arrow_right_icon_colored}
                            alt="arrow_right_icon_colored"
                        />
                        Go Back
                    </button>
                </form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;