import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Spinner from './Spinner'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
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
            <div style={{ height: 'calc(100vh - 44px)' }} className="w-full flex justify-center md:items-center items-start md:p-0 p-2 ">
                <form onSubmit={handleOnSubmit} className='md:w-[400px] w-full flex flex-col items-center border border-gray-300 rounded p-2'>
                    <h2 className="text-xl text-blue-400 my-2 font-semibold">Login as broker</h2>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/material-sharp/24/000000/phone.png" className='w-[20px]' alt="" />
                        <input name='id' onChange={handleOnChange} type="text" className='border-0 bg-transparent focus:outline-none w-full pl-1' placeholder='Enter email or phone' />
                    </div>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/password--v1.png" className='w-[20px]' alt="" />
                        <input type="password" id='password-input' onChange={handleOnChange} name='password' className='border-0 bg-transparent focus:outline-none w-full pl-1' placeholder='Password' />
                        <button type='button' >
                            {
                                !showPassword && <AiOutlineEye className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword} />
                            }
                            {
                                showPassword && <AiOutlineEyeInvisible className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword} />
                            }
                        </button>
                    </div>
                    <div className="w-full flex justify-center">
                        {
                            !logging && <button className="px-2 py-1 bg-blue-300 focus:bg-blue-400 text-lg my-2 rounded text-white">Login</button>
                        }
                        {
                            logging && <button className="px-2 py-1 bg-blue-300 focus:bg-blue-400 text-lg my-2 rounded text-white"><Spinner /></button>
                        }
                    </div>
                    <div className="w-full flex items-center justify-center text-sm">
                        <Link href={'/forgot-password'}><button className=''>Forgot Password?</button></Link>
                        <Link href={'/signup'}><button className="px-2 py-1 text-orange-400 hover:text-orange-300">Create an account</button></Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login