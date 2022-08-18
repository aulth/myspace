import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdOutlineChevronRight, MdOutlineChevronLeft } from 'react-icons/md'
const Itemcard = ({data}) => {
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
            <div className="border gm md:w-[250px] w-full border-gray-400 rounded p-1 m-1">
                <div className="w-full relative">
                    <img src={image} className='w-full rounded-sm' alt="" />
                    <div className="w-full flex justify-between absolute top-[50%] px-1">
                        <MdOutlineChevronLeft className='bg-white text-lg rounded hover:bg-gray-100 cursor-pointer' onClick={handleOnBack} />
                        <MdOutlineChevronRight className='bg-white text-lg rounded hover:bg-gray-100 cursor-pointer' onClick={handleOnNext} />
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="font-bold">{data.title}</h2>
                    <p className="text-sm font-semibold">{data.location}</p>
                    <p className="text-sm font-semibold">Rs {data.rent} + (50% Fee one time)</p>
                    <Link href={`/item/${data.url}`} >
                        <button className="w-full py-1 px-2 bg-cyan-400 text-white text-center rounded-sm hover:bg-cyan-500 mt-1">View</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Itemcard