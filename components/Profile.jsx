'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from "@/context/AppContext";
import axios from 'axios';

const Profile = () => {

    const { Email } = useAppContext();
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.post('/api/userData', { Email })
                setUserData(response.data.Data)
            } catch (error) {
                console.log("Error in Userinfo fetching..", error)
            }
        }
        getInfo();
    }, [Email])

    return (
        <div className="flex flex-col gap-8">
            <h2 className='uppercase text-2xl font-medium'>Personal information</h2>
            <div className="grid grid-cols-2 gap-x-20 gap-y-5">
                <div className='flex flex-col'>
                    <label className='flex justify-between text-black/50'>
                        User Name
                        <button className='text-blue-500'>*Change</button>
                    </label>
                    <input type="text" className='bg-green-100 p-2' value={userData.Username} disabled />
                </div>

                <div className='flex flex-col'>
                    <label className='flex justify-between text-black/50'>Email<button className='text-blue-500'>*Change</button></label>
                    <input type="text" className='bg-green-100 p-2' value={userData.Email} disabled
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='flex justify-between text-black/50'>Contact<button className='text-blue-500'>*Change</button></label>
                    <span className='flex gap-4'>
                        <input className='w-16 bg-green-100 p-2' type="text" value="+91" disabled />
                        <input type="text" className='bg-green-100 w-full p-2' value={userData.phone} disabled />
                    </span>
                </div>

            </div>
            <div className='button'>
                <p className='text-black/40'>Your data will handled care</p>
                <button disabled className='bg-blue-700 text-white px-8  py-2'>Update</button>
            </div>
        </div>
    )
}

export default Profile