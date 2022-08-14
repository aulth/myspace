import React, { useState } from 'react'
import Navbar from './Navbar'
import {MdOutlineChevronRight, MdOutlineChevronLeft} from 'react-icons/md'

const Itempage = ({item}) => {
    let imageArray = item.photo
    const [image, setImage] = useState(imageArray[0])
    const [slideNo, setSlideNo] = useState(0)
    const handleOnNext = ()=>{
        let slide = slideNo;
        slide++;
        if(slide>=imageArray.length){
            slide=0;
        }
        setImage(imageArray[slide])
        setSlideNo(slide)
    }
    const handleOnBack = ()=>{
        let slide = slideNo;
        slide--;
        if(slide<0){
            slide = imageArray.length-1;
        }
        setImage(imageArray[slide])
        setSlideNo(slide)
    }
    return (
        <>
            <style jsx>
                {`
        
        tr, td{
            border:1px solid gray;
            border-collapse:collapse;
        }
        td{
            padding-left:2px;
        }
        `}
            </style>
            {
                console.log(item)
            }
            <Navbar />
            <div className="w-full flex md:flex-row flex-col md:mt-1 justify-cente items-start">
                <div className="w-full flex gm justify-center items-center relative">
                    <img src={image} className='w-full' alt="" />
                    <div className="w-full flex justify-between absolute top-[50%] px-4">
                        <MdOutlineChevronLeft className='bg-white text-lg rounded hover:bg-gray-100 cursor-pointer' onClick={handleOnBack}/>
                        <MdOutlineChevronRight className='bg-white text-lg rounded hover:bg-gray-100 cursor-pointer' onClick={handleOnNext}/>
                    </div>
                </div>
                <div className="w-full p-2 gm ">
                    <h2 className='text-xl font-bold'>{item.title}</h2>
                    <h3 className='text-lg font-semibold'>Rent : Rs {item.rent} + Brokerage Fee (50%)*</h3>
                    <h4 className='font-semibold'>Details</h4>
                    <table className='w-full'>
                        <tbody>
                            <tr>
                                <td>Location</td>
                                <td>{item.location}</td>
                            </tr>
                            <tr>
                                <td>Furnished</td>
                                <td>{item.furnished?'Yes':'No'}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{item.category}</td>
                            </tr>
                            <tr>
                                <td>Ac</td>
                                <td>{item.ac?'Available':'Not Available'}</td>
                            </tr>
                            <tr>
                                <td>Floor</td>
                                <td>{item.floor}</td>
                            </tr>
                            <tr>
                                <td>Electricity Included</td>
                                <td>{item.electricityincluded?'Yes':'No'}</td>
                            </tr>
                            <tr>
                                <td>Nearby Location </td>
                                <td>{item.nearbyplace}</td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="w-full flex text-lg mt-2">
                        <button className="w-full py-1 px-2 bg-blue-400 rounded text-white">Contact to Broker</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Itempage