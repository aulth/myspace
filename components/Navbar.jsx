import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
      router.push('/')
    }
  }
  return (
    <div className="w-full flex items-center justify-between box-border p-2 shadow-sm">
      <Link href={'/'}><h2 className="logo text-xl font-bold cursor-pointer hover:text-blue-400">MySpace</h2></Link>
      <ul className="flex items-center">
        <Link href={"/add"} ><li className='mx-1 hover:text-blue-400 font-semibold cursor-pointer'>Add</li></Link>
        <li className='mx-1 hover:text-blue-400 font-semibold cursor-pointer'>Contact</li>
        {
          loggedIn && <>
            <div className='relative'>
              <li onClick={toggleProfile} className='mx-1 hover:text-blue-400 font-semibold cursor-pointer'><img className='w-[30px] rounded-full' src={localStorage.getItem('ms-photo')} alt="" /></li>
              <div id='myaccount' className="border hidden bg-white  items-start w-[100px] border-gray-300 p-1 rounded-sm absolute right-0 top-[37px]">
                <button className='hover:font-semibold'>My Account</button>
                <button className='hover:font-semibold' onClick={handleOnLogout}>Logout</button>
              </div>
            </div>
          </>
        }
        {
          !loggedIn && <Link href={"/login"}><li className='mx-1 hover:text-blue-400 font-semibold cursor-pointer'>Login</li></Link>
        }

      </ul>
    </div>
  )
}

export default Navbar