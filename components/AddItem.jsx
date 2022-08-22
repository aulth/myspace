import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'
import ShortUniqueId from 'short-unique-id'
import { useRouter } from 'next/router'
const AddItem = () => {
    const uid = new ShortUniqueId({ length: 5 })
    const router = useRouter()
    const [adding, setAdding] = useState()
    const [uploading, setUploading] = useState()
    const [item, setItem] = useState({ title: '', location: '', url: '', nearbyplace: '', rent: '', category: '1 BHK', furnished: 'false', electricityincluded: 'false', ac: 'false', floor: '1', photo: [], authtoken:'' })
    let image = []
    useEffect(() => {
      if(typeof window!=='undefined')
        if(localStorage.getItem('ms-authtoken')){
            setItem({...item, authtoken:localStorage.getItem('ms-authtoken')})
        }else{
            router.push('/')
        }
    }, [])
    
    const handleOnChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'title') {
            setItem({ ...item, title: e.target.value, url: e.target.value.replace(/[^a-zA-Z1-9]/g, '-')+'-'+uid() })
        } else if(e.target.name==='url'){
            setItem({...item, url:e.target.value.replace(/[^a-zA-Z1-9]/g, '-')})
        }
        else {
            setItem({ ...item, [e.target.name]: e.target.value })
        }
    }
    const handleOnUploadImage = async (e) => {
        e.preventDefault();
        setUploading(true)
        if (typeof window !== 'undefined') {
            let uploadedImage = document.getElementById('uploaded-image')
            const files = e.target.files;
            for (let i = 0; i < e.target.files.length; i++) {
                let data = new FormData();
                data.append('file', files[i]);
                data.append('upload_preset', 'myspaceitem');
                let response = await fetch('https://api.cloudinary.com/v1_1/mohdusman1/image/upload', {
                    method: "POST",
                    body: data
                })
                let file = await response.json();
                image.push(file.url)
                let imgElem = document.createElement('img');
                imgElem.classList = 'w-[150px] mr-1'
                imgElem.src = file.url;
                uploadedImage.appendChild(imgElem)
            }
            setItem({ ...item, photo: image })
            setUploading(false)
        }
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setAdding(true)
        if (typeof window !== 'undefined') {
            const response = await fetch('/api/additem', {
                method: "POST",
                body: JSON.stringify(item)
            })
            const data = await response.json();
            if (data.success) {
                toast.success("Item added successfully")
                setItem({ title: '', location: '', url: '', nearbyplace: '', rent: '', category: '1 BHK', furnished: 'false', electricityincluded: 'false', ac: 'false', floor: '1', photo: [], authtoken:localStorage.getItem('ms-authtoken')})
                setAdding(false)
            } else {
                toast.error(data.msg)
                setAdding(false)
            }
        }
    }
    return (
        <>
            <Navbar />
            <ToastContainer position='top-right'/>
            <div className="w-full flex justify-center p-4">
                <form onSubmit={handleOnSubmit} className='w-full'>
                    <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="title">Title <span className=' text-red-400'>*</span> </label>
                        <input name='title' onChange={handleOnChange} placeholder='1 BHK Flat' id='title-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div>
                    {/* <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="title">Url</label>
                        <input name='url' onChange={handleOnChange} placeholder='url' value={item.url} id='url-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div> */}
                    <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="location">Location <span className=' text-red-400'>*</span> </label>
                        <input name='location' onChange={handleOnChange} placeholder='Pahlewan Chauk Batla House, Okhla New Delhi 110025' id='location-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div>
                    <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="nearby-place">Nearby Place <span className=' text-red-400'>*</span> </label>
                        <input name='nearbyplace' onChange={handleOnChange} placeholder='Al Noot Masjid, Farhan Juice Corner' id='nearby-place-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="flex flex-col items-start my-1">
                            <label htmlFor="">Rent (INR)<span className=' text-red-400'>*</span> </label>
                            <input name='rent' onChange={handleOnChange} placeholder='5000' id='rent-input' type="number" className='w-[90px] pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                        </div>
                        <div className="flex flex-col items-start my-1 ml-2">
                            <label htmlFor="">Category?<span className=' text-red-400'>*</span> </label>
                            <select onChange={handleOnChange} name="category" className='border border-gray-400 w-full' id="">
                                <option value="1 BHK">1 BHK</option>
                                <option value="2 BHK">2 BHK</option>
                                <option value="3 BHK">3 BHK</option>
                                <option value="1 RK">1 RK</option>
                                <option value="Single Room">Single Room</option>
                                <option value="PG">PG</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-start my-1 ml-2">
                            <label htmlFor="">Furnished?<span className=' text-red-400'>*</span> </label>
                            <select onChange={handleOnChange} name="furnished" className='border border-gray-400 w-full' id="">
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-start my-1 ml-2">
                            <label htmlFor="">Ac?<span className=' text-red-400'>*</span> </label>
                            <select onChange={handleOnChange} name="ac" className='border border-gray-400 w-full' id="">
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-start my-1 ml-2 mr-2">
                            <label htmlFor="">Floor<span className=' text-red-400'>*</span> </label>
                            <select onChange={handleOnChange} name="floor" className='border border-gray-400 w-full' id="">
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                <option value="3">3rd</option>
                                <option value="4">4th</option>
                                <option value="5">5th</option>
                                <option value="6">6th</option>
                                <option value="7">7th</option>
                                <option value="8">8th</option>
                                <option value="9">9th</option>
                                <option value="10">10th</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-start my-1">
                            <label htmlFor="">Electricity Included<span className=' text-red-400'>*</span> </label>
                            <select onChange={handleOnChange} name="electricityincluded" className='border border-gray-400 w-full' id="">
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="photo">Photo<span className=' text-red-400'>*</span> </label>
                        <div className="w-full flex items-center">
                        {
                            uploading && <img src='/images/uploadgif.gif' className='w-[25px] mr-2'/>
                        }
                        <input id='photo-input' onChange={handleOnUploadImage} type="file" className='pl-1rounded outline-none' multiple />
                        </div>
                    </div>
                    <div id="uploaded-image" className='flex flex-wrap mt-2'>
                    </div>
                    <div className="w-full flex flex-col items-start  my-1">
                        {
                            !adding && <input type="submit" value="Add" className='py-1 px-2 bg-blue-400 text-white cursor-pointer mt-1 hover:bg-blue-500' />
                        }
                        {
                            adding && <input type="button" value="Adding" className='py-1 px-2   text-blue-400 cursor-pointer mt-1' />
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddItem