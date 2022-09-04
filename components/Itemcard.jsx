import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdOutlineChevronRight, MdOutlineChevronLeft, MdOutlineBed, MdOutlineWaterDrop } from 'react-icons/md'
import { GiElectric } from 'react-icons/gi'
import { BsInfoCircle } from 'react-icons/bs'
import { BiRupee } from 'react-icons/bi'
const Itemcard = ({ data }) => {
    let imageArray = data.photo
    const [image, setImage] = useState(imageArray[0])
    const [slideNo, setSlideNo] = useState(0)
    const handleOnNext = () => {
        let slide = slideNo;
        slide++;
        if (slide >= imageArray.length) {
            slide = 0;
        }
        setImage(imageArray[slide])
        setSlideNo(slide)
    }
    const handleOnBack = () => {
        let slide = slideNo;
        slide--;
        if (slide < 0) {
            slide = imageArray.length - 1;
        }
        setImage(imageArray[slide])
        setSlideNo(slide)
    }
    return (
        <>
            {/* <div className="border gm md:w-[250px] w-full border-gray-400 rounded p-1 m-1">
                <div className="w-full relative">
                    <img src={image} className='w-full rounded-sm' alt="" />
                    <div className="w-full flex justify-between absolute top-[50%] px-1">
                        <MdOutlineChevronLeft className='bg-white text-lg rounded hover:  cursor-pointer' onClick={handleOnBack} />
                        <MdOutlineChevronRight className='bg-white text-lg rounded hover:  cursor-pointer' onClick={handleOnNext} />
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="font-bold">{data.title}</h2>
                    <p className="text-sm font-semibold">{data.location}</p>
                    <p className="text-sm font-semibold">Rs {data.rent} + (50% Fee one time)</p>
                    <Link href={`/item/${data.url}`} >
                        <button className="w-full py-1 px-2 bg-blue-400 text-white text-center rounded-sm hover:bg-blue-500 mt-1">View</button>
                    </Link>
                </div>
            </div> */}
            <div className="flex flex-col bg-gray-100  md:w-[500px] w-full justify-center items-center border border-gray-500 rounded-b rounded-t m-1">
                <div className="w-full flex justify-between    border rounded-t p-2">
                    <div>
                        <h2 className="text-lg font-bold">{data.title}</h2>
                        <h3 className="text-sm font-semibold">{data.location}</h3>
                    </div>
                    <div className='flex flex-col items-center text-sm cursor-default'>
                        <h2 className="text-sm flex items-center">
                            <BiRupee  />{data.rent}
                        </h2>
                        <h3 title='One Time Fee'>+ (50% OTF)</h3>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center md:flex-row md:items-stretch">
                    <div className="w-full relative">
                        <img src={image} className='w-full md:w-[500px] aspect-[4/3] rounded-sm' alt="" />
                        <div className="w-full flex justify-between absolute top-[50%] px-1">
                            <button><MdOutlineChevronLeft className='bg-white text-lg rounded hover:  cursor-pointer' onClick={handleOnBack} /></button>
                            <button><MdOutlineChevronRight className='bg-white text-lg rounded hover:  cursor-pointer' onClick={handleOnNext} /></button>
                        </div>
                    </div>
                    <div className="w-full grid grid-rows-3 grid-cols-2">
                        <div className="p-2 flex items-center  ">
                            <div className="w-full flex flex-col items-center justify-center">
                                <MdOutlineBed />
                                <h2 className="text-sm font-bold">{data.furnished?'Furnished':'Not Furnished'}</h2>
                            </div>
                        </div>
                        <div className="p-2 flex items-center  ">
                            <div className="w-full flex flex-col items-center justify-center">
                                <GiElectric />
                                <h2 className="text-sm font-bold">{data.electricityincluded?'Included':'Not Included'}</h2>
                            </div>
                        </div>
                        <div className="p-2 flex items-center  ">
                            <div className="w-full flex flex-col items-center justify-center">
                                <MdOutlineWaterDrop />
                                <h2 className="text-sm font-bold">{data.waterincluded?'Included':'Not Included'}</h2>
                            </div>
                        </div>
                        <div className="p-2 flex items-center  ">
                            <div className="w-full flex flex-col items-center justify-center">
                                <img src="https://img.icons8.com/ios/50/000000/air-conditioner.png" className='w-[15px]' alt="" />
                                <h2 className="text-sm font-bold">{data.ac?'Available':'Not Available'}</h2>
                            </div>
                        </div>
                        <div className="p-2 flex items-center  ">
                            <div className="w-full flex flex-col items-center justify-center">
                                <img src="https://img.icons8.com/ios/50/000000/stairs.png" className='w-[15px]' alt="" />
                                <h2 className="text-sm font-bold">{data.floor==1?'1st Floor':data.floor==2?'2nd Floor':data.floor==3?'3rd Floor':data.floor+'th Floor'}</h2>
                            </div>
                        </div>
                        <div className="p-2 flex items-center  ">
                            <div className="w-full flex flex-col items-center justify-center">
                                <img src="https://img.icons8.com/ios/50/000000/floor-plan.png" className='w-[15px]' alt="" />
                                <h2 className="text-sm font-bold">{data.category}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <Link href={`/item/${data.url}`} ><button className="w-full text-center px-2 py-1 bg-[rgba(0,129,227,0.5)] rounded-bl hover:font-semibold">View</button></Link>
                    <button className="w-full text-center px-2 py-1 bg-[rgba(0,129,227,0.5)] rounded-br hover:font-semibold">Contact to Broker</button>
                </div>
            </div>
        </>
    )
}

export default Itemcard