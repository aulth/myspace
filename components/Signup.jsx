import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: '', email: '', phone: '', password: '', photo: '' });
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        if(typeof window!=='undefined' && localStorage.getItem('ms-authtoken')){
           router.push('/')
        }
       }, [])
    const handleOnChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }
    const handleOnImageUpload = async (e) => {
        console.log('image uploading')
        const files = e.target.files;
        console.log(files[0])
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'myspace')
        const response = await fetch('https://api.cloudinary.com/v1_1/mohdusman1/image/upload', {
            method: 'POST',
            body: data
        })
        let file = await response.json();
        console.log(file.url)
        setUser({...user, photo:file.url})
        console.log(user)
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if(!user.name || !user.email || !user.phone || !user.password || !user.photo){
            toast.error("Please fill all the fields")
        }else{
            console.log('fetching signup')
        const response = await fetch('/api/signup', {
            method:'POST',
            headers:{
                'content-type':'Application/json'
            },
            body:JSON.stringify({name:user.name, email:user.email, phone:user.phone, password:user.password, photo:user.photo})
        })
        const data = await response.json();
        console.log(data)
        if(data.success){
            localStorage.setItem('ms-userid', data.userid);
            localStorage.setItem('ms-authtoken', data.authtoken);
            localStorage.setItem('ms-username', data.name);
            localStorage.setItem('ms-email', data.email);
            localStorage.setItem('ms-photo', data.photo);
            toast.success("Sign up successfull")
            router.push('/')
        }else{
            toast.error(data.msg)
        }
    }
    }

    const showHidePassword = ()=>{
        if(typeof window!=='undefined'){
            let elem =document.getElementById('password-input');
            if(elem.type == 'password'){
                elem.type = 'text'
                setShowPassword(true)
            }else{
                elem.type = 'password'
                setShowPassword(false)
            }
        }
    }
    return (
        <>
            <Navbar />
            <ToastContainer position='top-right'/>
            <div style={{ height: 'calc(100vh - 44px)' }} className="w-full flex justify-center md:items-center items-start md:p-0 p-2 ">
                <form onSubmit={handleOnSubmit} className='md:w-[400px] w-full flex flex-col items-center border border-gray-300 rounded p-2'>
                   {
                    user.photo &&  <div className="m-auto w-[50px]">
                    <img src={user.photo} className=' rounded-full mt-2' alt="" />
                </div>
                   }
                    <h2 className="text-xl text-cyan-400 my-2 font-semibold">Signup as Broker</h2>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/glyph-neue/64/000000/name.png" className='w-[20px]' alt="" />
                        <input type="text" name='name' onChange={handleOnChange} className='border-0 focus:outline-none w-full pl-1 bg-transparent' placeholder='Name' />
                    </div>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/material-outlined/24/000000/new-post.png" className='w-[20px]' alt="" />
                        <input type="email" name='email' onChange={handleOnChange} className='border-0 focus:outline-none w-full pl-1 bg-transparent' placeholder='Email' />
                    </div>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/material-sharp/24/000000/phone.png" className='w-[20px]' alt="" />
                        <input type="tel" name='phone' onChange={handleOnChange} className='border-0 focus:outline-none w-full pl-1 bg-transparent' placeholder='Phone Number' />
                    </div>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/password--v1.png" className='w-[20px]' alt="" />
                        <input id='password-input' type="password" name='password' onChange={handleOnChange} className='border-0 focus:outline-none w-full pl-1 bg-transparent' placeholder='Password' />
                        <button type='button' >
                        {
                            !showPassword && <AiOutlineEye className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword}/>
                        }
                        {
                            showPassword && <AiOutlineEyeInvisible  className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword} />
                        }
                        </button>
                    </div>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/material-outlined/24/000000/image.png" className='w-[20px]' alt="" />
                        <input type="file" name='image' title='Upload Profile Pic' onChange={handleOnImageUpload} className='border-0 focus:outline-none w-full pl-1'  />
                    </div>
                    <div className="w-full flex justify-center">
                        <button className="px-2 py-1 bg-cyan-300 focus:bg-cyan-400 text-lg my-2 rounded text-white">Signup</button>
                    </div>
                    <div className="w-full flex items-center justify-center text-sm">
                        <p className=''>Already have an account?</p>
                        <Link href={'/login'}><button className="px-2 py-1 text-orange-400 hover:text-orange-300">Login</button></Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup