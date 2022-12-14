import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Spinner from './Spinner'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const router = useRouter();
    const [logging, setLogging] = useState()
    const [user, setUser] = useState({ id: '', password: '' });
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('ms-authtoken')) {
            router.push('/')
        }
    }, [])
    const handleOnChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (!user.id || !user.password) {
            toast.info("Please fill all the fields")
        } else {
            if(user.id.includes('@')){
                let emailData= await fetch(`https://api.bigdatacloud.net/data/email-verify?emailAddress=${user.id}&key=${process.env.bigdatacloudapi}`);
                var emailDataJson = await emailData.json();
            }
            if(!emailDataJson.isValid){
                toast.info("Please fill a valid email")
                setLogging(false)
                return;
            }
            setLogging(true)
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(user)
            })
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('ms-userid', data.userid);
                localStorage.setItem('ms-authtoken', data.authtoken);
                localStorage.setItem('ms-username', data.name);
                localStorage.setItem('ms-email', data.email);
                localStorage.setItem('ms-photo', data.photo);
                toast.success("Login successfull")
                setLogging(false)
                router.push('/')
            } else {
                setLogging(false)
                toast.error(data.msg)
            }
        }
    }
    const showHidePassword = () => {
        if (typeof window !== 'undefined') {
            let elem = document.getElementById('password-input');
            if (elem.type == 'password') {
                elem.type = 'text'
                setShowPassword(true)
            } else {
                elem.type = 'password'
                setShowPassword(false)
            }
        }
    }
    return (
        <>
            <Navbar />
            <ToastContainer position='top-right' />
            <div style={{minHeght:'calc(100vh - 50px)'}} className="w-full flex justify-cente items-center">
                <div className="w-full flex justify-center items-center">
                    <form onSubmit={handleOnSubmit}  className="md:w-[400px] w-full p-3  flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center">
                            <img src="/images/logo.png" className='w-[150px]' alt="" />
                            <h2 className="text-2xl font-bold">Login to mySpace</h2>
                        </div>
                        <div className="w-full my-2 mt-4 border border-gray-200 rounded flex justify-center items-center">
                            <CgProfile className='text-xl ml-1' />
                            <input type="text" name='id'  onChange={handleOnChange}   placeholder='Email or phone number' className="w-full focus:outline-none p-1 border-none" />
                        </div>
                        <div className="w-full my-2 border border-gray-200 rounded flex justify-center items-center">
                            <RiLockPasswordLine className='text-xl ml-1' />
                            <input type="password" name='password'  onChange={handleOnChange}  id='password-input' placeholder='Password' className="w-full focus:outline-none p-1 border-none" />
                            <button type='button' >
                            {
                                !showPassword && <AiOutlineEye className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword} />
                            }
                            {
                                showPassword && <AiOutlineEyeInvisible className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword} />
                            }
                        </button>
                        </div>
                        <div className="w-full my-2 border border-gray-200 rounded flex justify-center items-center">
                            {
                                !logging && <input type="submit" value="Login " placeholder='Password' className="w-full font-semibold text-white hover:bg-blue-500 cursor-pointer bg-blue-400 focus:outline-none p-1 border-none" />
                            }
                        </div>
                        <div className="w-full my-2 border border-gray-200 rounded flex justify-center items-center">
                            {
                                logging && <button  className="text-md font-semibold hover:text-blue-400 cursor-pointer " >
                                    <Spinner />
                                </button>
                            }
                        </div>
                        <div className="w-full my-2 rounded flex justify-center md:flex-row flex-col items-center">
                        <Link href={'/signup'}><button className="text-md font-semibold hover:text-blue-400 cursor-pointer ">Create an account</button></Link>
                        <Link href={'/forgot-password'}><h2 className="text-md font-semibold hover:text-blue-400 cursor-pointer md:ml-2">Forgot Password</h2></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login