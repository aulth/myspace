import React, { useState, useEffect } from 'react'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineAccountCircle, MdOutlineBookmarkBorder } from 'react-icons/md'
import Link from 'next/link'
import Search from './Search'
import {useRouter} from 'next/router'
const MobileNavbar = () => {
    const router = useRouter();
    const [isSearchOpen, setisSearchOpen] = useState()
    const [isHome, setIsHome] = useState()
    const [isAccount, setIsAccount] = useState()
    const toggleSearch = () => {
        if (isSearchOpen) {
            setisSearchOpen(false)
        } else {
            setisSearchOpen(true)
            setIsHome(false)
            setIsAccount(false)
        }
    }
    useEffect(() => {
      if(router.pathname.length>1){
        setIsHome(false)
      }else{
        setIsHome(true)
      }
      if(router.pathname.includes('user')){
        setIsAccount(true)
      }else{
        setIsAccount(false)
      }
    }, [router])
    
    return (
        <>
            {
                isSearchOpen && <div className="w-full fixed top-0 gm z-30">
                    <Search />
                </div>
            }
            {/* <div className="w-full flex md:hidden justify-between items-center p-2 border-box fixed bottom-0 bg-gray-500 rounded-tl rounded-tr gm">
                <div className="flex w-1/4 items-center justify-center">
                    <Link href={'/'} ><AiOutlineHome onClick={()=>{setisSearchOpen(false)}} className={`text-[24px] cursor-pointer hover:text-cyan-500 ${isHome?'text-cyan-500 font-semibold':'text-black'} `} /></Link>
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <AiOutlineSearch  onClick={toggleSearch} className={`text-[24px] cursor-pointer hover:text-cyan-500 ${isSearchOpen?'text-cyan-500 font-semibold':'text-black'} ` } />
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <MdOutlineBookmarkBorder className="text-[24px] cursor-pointer hover:text-cyan-500" />
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <Link href={"/user"} ><MdOutlineAccountCircle  onClick={()=>{setisSearchOpen(false)}}   className={`text-[24px] cursor-pointer hover:text-cyan-500 ${isAccount?'text-cyan-500 font-semibold':'text-black'} `} /></Link>
                </div>
            </div> */}
            <div className="w-full flex md:hidden justify-between items-center p-2 border-box fixed bottom-0 bg-gray-500 rounded-tl rounded-tr gm">
                <div className="flex w-1/4 items-center justify-center">
                    <Link href={'/'} ><a><AiOutlineHome onClick={()=>{setisSearchOpen(false)}} className={`text-[24px] cursor-pointer hover:text-cyan-500 ${isHome?'text-cyan-500 font-semibold':'text-black'} `} /></a></Link>
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <AiOutlineSearch  onClick={toggleSearch} className={`text-[24px] cursor-pointer hover:text-cyan-500 ${isSearchOpen?'text-cyan-500 font-semibold':'text-black'} ` } />
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <MdOutlineBookmarkBorder className="text-[24px] cursor-pointer hover:text-cyan-500" />
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <Link href={"/user"} ><a><MdOutlineAccountCircle  onClick={()=>{setisSearchOpen(false)}}   className={`text-[24px] cursor-pointer hover:text-cyan-500 ${isAccount?'text-cyan-500 font-semibold':'text-black'} `} /></a></Link>
                </div>
            </div>

        </>
    )
}

export default MobileNavbar