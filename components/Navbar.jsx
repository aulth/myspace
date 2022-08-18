import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('ms-authtoken')) {
        setLoggedIn(true)
      }
    }
  }, [])
  const toggleProfile = () => {
    if (typeof window !== 'undefined') {
      document.getElementById('myaccount').classList.toggle('hidden')
    }
  }
  const handleOnLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ms-userid');
      localStorage.removeItem('ms-authtoken');
      localStorage.removeItem('ms-username');
      localStorage.removeItem('ms-email');
      localStorage.removeItem('ms-photo');
      toggleProfile();
      toast.success("Logged out succesfully")
      if(router.pathname.length>1){
        router.push('/')
      }else{
        location.reload()
      }
    }
  }
  return (
    <>
    <ToastContainer position='top-right'/>
    <div className="w-full bg-cyan-500 flex items-center justify-between box-border p-2 shadow-sm">
      <Link href={'/'}><img src='/images/logo.png' className='w-[150px] cursor-pointer'/></Link>
      <ul className="flex items-center">
        <Link href={"/add"} ><li className='mx-1 hover:text-white font-semibold cursor-pointer'>Add</li></Link>
        <li className='mx-1 hover:text-white font-semibold cursor-pointer'>Contact</li>
        {
          loggedIn && <>
            <div className='relative z-20'>
              <li onClick={toggleProfile} className='mx-1 hover:text-white font-semibold cursor-pointer'><img className='w-[30px] rounded-full' src={localStorage.getItem('ms-photo')} alt="" /></li>
              <div id='myaccount' className="border gm z-10 hidden bg-white  items-start w-[100px] border-gray-300 p-1 rounded-sm absolute right-0 top-[42px]">
                <Link href={'/user'} ><button className='hover:font-semibold'>My Account</button></Link>
                <button className='hover:font-semibold' onClick={handleOnLogout}>Logout</button>
              </div>
            </div>
          </>
        }
        {
          !loggedIn && <Link href={"/login"}><li className='mx-1 hover:text-white font-semibold cursor-pointer'>Login</li></Link>
        }
      </ul>
    </div>
    </>

  )
}

export default Navbar