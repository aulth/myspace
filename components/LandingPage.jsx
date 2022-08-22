import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
const LandingPage = () => {
    const isMd = useMediaQuery({query:'(min-width:768px)'})
    return (
        <>
            <div className="w-full h-screen relative overflow-hidden ">
                <div className="rounded-full absolute top-[0%] left-[0%] bg-pink-400 w-[400px] h-[400px] opacity-10"></div>
                <div className="rounded-full absolute top-[10%] left-[80%] bg-yellow-200 w-[400px] h-[400px] opacity-10"></div>
                <div className="rounded-full absolute md:top-[30%] bottom-[10%] left-[30%] bg-blue-400 w-[400px] h-[400px] opacity-10"></div>
                <div className="rounded-full absolute bottom-[50%] left-[60%] bg-green-400 w-[400px] h-[400px] opacity-10"></div>
                <div className="rounded-full absolute bottom-[40%] left-[10%] bg-gray-400 w-[400px] h-[400px] opacity-10"></div>
                <div className="w-full h-screen absolute top-0 gm">
                    <div className="w-full">
                        <Navbar />
                        <div style={{height:isMd?'calc(100vh - 50px)':'calc(100vh - 92px)'}} className="w-full px-2 md:text-[50px]  text-center text-[40px] font-extrabold flex flex-col justify-center items-center font-[gabodrive] ">
                            <h2 className='md:px-0 px-2' >Easy Way To Find The Perfect Space</h2>
                            <div className="w-3/4 justify-center items-center text-sm font-[goldplay] my-5">
                                <Search />
                            </div>
                            <div className="md:w-3/4 w-full flex justify-around items-center text-sm font-[goldplay] my-5">
                                <div className="p-2 w-[132px] border flex flex-col items-center border-gray  rounded gm">
                                    <b className="md:text-xl text-lg font-bold">100+</b>
                                    <h3 className="md:text-lg text-base ">Flats Available</h3>
                                </div>
                                <div className="p-2 w-[132px]  border flex flex-col items-center border-gray rounded gm">
                                    <h2 className="md:text-xl text-lg font-bold">50+</h2>
                                    <h3 className="md:text-lg text-base ">Pg Available</h3>
                                </div>
                                <div className="p-2 w-[132px]  border flex flex-col items-center border-gray rounded gm">
                                    <h2 className="md:text-xl text-lg font-bold">100+</h2>
                                    <h3 className="md:text-lg text-base ">Customers</h3>
                                </div>
                            </div>
                            <div className="w-full my-3 text-base flex justify-center items-center font-[goldplay] ">
                                <Link href={"/signup"} ><button className="bg-[#414141] hover:bg-[#2d2c2c] rounded px-2 py-1 font-bold text-white">Join as Lister</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LandingPage