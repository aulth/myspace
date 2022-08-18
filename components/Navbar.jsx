import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search';
import { BsPlusCircle } from 'react-icons/bs'
import { MdOutlineAccountCircle } from 'react-icons/md'
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
      if (router.pathname.length > 1) {
        router.push('/')
      } else {
        location.reload()
      }
    }
  }
  return (
    <>
      <ToastContainer position='top-right' />
      <div className="w-full bg-cyan-500 flex items-center justify-between box-border p-2 shadow-sm">
        <Link href={'/'}><img src='/images/logo.png' className='w-[150px] cursor-pointer' /></Link>
        <div className="md:w-3/4 mx-4  gm md:flex hidden items-center pl-1 rounded" id='search-box'>
          <img src="https://img.icons8.com/ios/50/000000/search--v1.png" className='w-[20px]' alt="" />
          <input type="search" placeholder='Search here..' className='w-full bg-transparent h-full focus:outline-none border-0 p-2 ml-1' name='search' id='search-input' />
          <div className="flex p-2 border h-full border-gray-100  items-center justify-center">
            <button className="text-center px-2  hover:text-cyan-300 focus:text-cyan-400">Filter</button>
            <button className="text-center pl-2 border-l border-gray-100 hover:text-cyan-300 focus:text-cyan-400">Sort</button>
          </div>
        </div>
        <ul className="flex items-center">
          {
            loggedIn && <>
              <div className='relative z-20'>
                <li onClick={toggleProfile} className='mx-1 hover:text-white font-semibold cursor-pointer'><img className='w-[30px] rounded-full' src={localStorage.getItem('ms-photo')} alt="" /></li>
                <div id='myaccount' className="border  flex-col gm z-10 hidden bg-white  items-start w-[120px] border-gray-300 p-1 rounded-sm absolute right-0 top-[42px]">
                  <div className="w-full">
                    <Link href={'/user'} >
                      <div className="w-full border-b  flex items-center border-gray-300 hover:text-cyan-500">
                        <MdOutlineAccountCircle className="text-lg" />
                        <button className='ml-1'>My Account</button>
                      </div>
                    </Link>
                    <Link href={'/add'} >
                      <div className="w-full border-b  flex items-center border-gray-300 hover:text-cyan-500">
                        <MdOutlineAccountCircle className="text-lg" />
                        <button className='ml-1'>Add Item </button>
                      </div>
                    </Link>
                    <div className="w-full border-b  flex items-center border-gray-300 hover:text-cyan-500">
                      <MdOutlineAccountCircle className="text-lg" />
                      <button className='ml-1' onClick={handleOnLogout}>Logout</button>
                    </div>
                  </div>

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