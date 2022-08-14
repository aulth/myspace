import React, {useState} from 'react'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Link from 'next/link'
const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({ id:'', password: ''});
    const handleOnChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if(!user.id || !user.password){
            Swal.fire({
                icon:'error',
                title:'Missing',
                text:"Please Fill All the fields"
            })
        }else{
        const response = await fetch('/api/login', {
            method:'POST',
            body:JSON.stringify(user)
        })
        const data = await response.json();
        console.log(data)
        if(data.success){
            localStorage.setItem('ms-userid', data.userid);
            localStorage.setItem('ms-authtoken', data.authtoken);
            localStorage.setItem('ms-username', data.name);
            localStorage.setItem('ms-email', data.email);
            localStorage.setItem('ms-photo', data.photo);
            Swal.fire({
                icon:'success',
                title:'Success',
                text:'Login succesfull'
            })
            router.push('/')
        }else{
            Swal.fire({
                icon:'error',
                title:'Failed',
                text:data.msg
            })
        }
    }
    }
    return (
        <>
            <Navbar />
            <div style={{ height: 'calc(100vh - 44px)' }} className="w-full flex justify-center md:items-center items-start md:p-0 p-2 ">
                <form onSubmit={handleOnSubmit} className='md:w-[400px] w-full flex flex-col items-center border border-gray-300 rounded p-2'>
                    <h2 className="text-xl text-blue-400 my-2 font-semibold">Login as broker</h2>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/material-sharp/24/000000/phone.png" className='w-[20px]' alt="" />
                        <input name='id' onChange={handleOnChange} type="text" className='border-0 focus:outline-none w-full pl-1' placeholder='Enter email or phone' />
                    </div>
                    <div className='flex items-center border border-gray-400 w-full rounded p-1 my-1'>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/password--v1.png" className='w-[20px]' alt="" />
                        <input type="password" onChange={handleOnChange} name='password' className='border-0 focus:outline-none w-full pl-1' placeholder='Password' />
                    </div>
                    <div className="w-full flex justify-center">
                        <button className="px-2 py-1 bg-blue-300 focus:bg-blue-400 text-lg my-2 rounded text-white">Login</button>
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