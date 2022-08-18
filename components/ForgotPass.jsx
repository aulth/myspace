import React, { useState } from 'react'
import Navbar from './Navbar'
import Link from 'next/link'
const ForgotPass = () => {
    const [otpSent, setOtpSent] = useState(false)
    return (
        <>
            <Navbar />
            <div style={{ height: 'calc(100vh - 44px)' }} className="w-full flex justify-center md:items-center items-start md:p-0 p-2 ">
                <form className='md:w-[400px] w-full flex flex-col items-center border border-gray-300 rounded p-2'>
                    <h2 className="text-xl text-cyan-400 my-2 font-semibold">Forgot Password</h2>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/material-sharp/24/000000/phone.png" className='w-[20px]' alt="" />
                        <input type="tel" className='border-0 focus:outline-none w-full pl-1' placeholder='Enter phone no..' />
                    </div>
                    {!otpSent && <div className="w-full flex justify-center">
                        <button className="px-2 py-1 bg-cyan-300 focus:bg-cyan-400 text-lg my-2 rounded text-white">Send OTP</button>
                    </div>}
                    {
                        otpSent && <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/password--v1.png" className='w-[20px]' alt="" />
                            <input type="text" className='border-0 focus:outline-none w-full pl-1' placeholder='Enter otp' />
                        </div>
                    }
                    <div className="w-full flex items-center justify-center text-sm">
                        <Link href={'/forgot-password'}><button className=''>Forgot Password?</button></Link>
                        <Link href={'/signup'}><button className="px-2 py-1 text-orange-400 hover:text-orange-300">Create an account</button></Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPass