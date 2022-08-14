import React from 'react'
import Itempage from '../components/Itempage'
import Navbar from '../components/Navbar'

const Item = () => {
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
    <Navbar/>
        <div className="w-full flex md:flex-row flex-col justify-cente items-center p-2">
            <div className="w-full flex justify-center items-center">
                <img src="https://img.icons8.com/external-fauzidea-flat-fauzidea/64/000000/external-flat-building-fauzidea-flat-fauzidea.png" className='md:w-[400px] w-[300px]' alt="" />
            </div>
            <div className="w-full md:p-5">
                <h2 className='text-xl font-bold'>1 BHK</h2>
                <h3 className='text-lg font-semibold'>Rent : Rs 5000 + Brokerage Fee (50%)*</h3>
                <h4 className='font-semibold'>Details</h4>
                <table className='w-full'>
                    <tbody>
                    <tr>
                        <td>Location</td>
                        <td>Pahlewan Chauk Batla House, Okhla New Delhi 110225</td>
                    </tr>
                    <tr>
                        <td>Furnished</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>1 BHK</td>
                    </tr>
                    <tr>
                        <td>Ac</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Floor</td>
                        <td>2nd</td>
                    </tr>
                    <tr>
                        <td>Electricity Included</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>Nearby Location </td>
                        <td>Al Noor Masjid, Farhan Juice Corner</td>
                    </tr>
                    
                    </tbody>
                </table>

                <div className="w-full flex text-lg mt-2">
                    <p className=" text-blue-400">Interested?</p>
                    <button className="text-orange-400 ml-2">Book/Contact to Broker</button>
                </div>
            </div>
        </div>

        </>
  )
}

export default Item