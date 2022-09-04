import React, {useState} from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import {useRouter} from 'next/router'
import Spinner from './Spinner'
const AdminItem = ({ item }) => {
    const router = useRouter()
    const [editWindow, seteditWindow] = useState()
    const [editting, setEditting] = useState()
    const [uploading, setUploading] = useState()
    const [itemData, setItemData] = useState({title:item.title, location:item.location, nearbyplace:item.nearbyplace, rent:item.rent, category:item.category, furnished:item.furnished, ac:item.ac, electricityincluded:item.electricityincluded, waterincluded:item.waterincluded,  floor:item.floor, photo:item.photo})
    const [newData, setNewData] = useState(itemData)
    const [available, setAvailable] = useState(item.available?true:false)
    const [deleteItem, setDeleteItem] = useState('Delete');
    let image=[]
    const handleOnDelete = async(id)=>{
        if(typeof window!=='undefined'){
            if(!localStorage.getItem('ms-authtoken')){
                toast.error('You are not authorized, please login and retry');
                return;
            }
            setDeleteItem('Deleting')
            const response = await fetch('/api/deleteitem', {
                method:'POST',
                body:JSON.stringify({id:id, authtoken:localStorage.getItem("ms-authtoken")})
            })
            const data = await response.json();
            if(data.success){
               toast.success(data.msg)
            }else{
                toast.error(data.msg)
            }
            setDeleteItem('Delete')
            document.getElementById(id).style.display='none'
        }
    }
    const handleOnStatusUpdate = async (id, available)=>{
        if(typeof window!=='undefined'){
            if(!localStorage.getItem('ms-authtoken')){
                toast.info("Please login and retry");
                return
            }
            const response = await fetch('/api/changestatus', {
                method:'POST',
                body:JSON.stringify({authtoken:localStorage.getItem('ms-authtoken'), id:id, available:available})
            })
            const data = await response.json();
            if(data.success){
                toast.success(data.msg)
                setAvailable(available)
            }else{
                toast.error(data.msg)
            }
        }
    }
    const triggerEditWindow = ()=>{
        if(editWindow){
            seteditWindow(false)
        }else{
            seteditWindow(true)
        }
    }
    const handleOnChange = (e)=>{
        e.preventDefault()
        setItemData({...itemData, [e.target.name]:e.target.value});
        // console.log(itemData)
    }
    const handleOnUploadImage = async (e) => {
        e.preventDefault();
        setUploading(true)
        if (typeof window !== 'undefined') {
            let uploadedImage = document.getElementById('uploaded-image')
            uploadedImage.innerHTML = ''
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
            setItemData({...itemData, photo: image })
            setUploading(false)
        }
    }
    const handleOnEdit = async (e)=>{
        e.preventDefault();
        if(typeof window!='undefined'){
            if(!localStorage.getItem('ms-authtoken')){
                toast.info("Please login and retry")
                return
            }
            const response = await fetch('/api/edititem', {
                method:'POST',
                body:JSON.stringify({authtoken:localStorage.getItem('ms-authtoken'), newData: itemData, id:item._id})
            })
            const data = await response.json();
            if(data.success){
                toast.success('Edit Success')
                setEditting(false)
                seteditWindow(false)
                setNewData(itemData)
            }else{
                toast.error(data.msg)
            }

        }
    }
    return (
        <>
            <ToastContainer position='top-right'/>

            {
                item && !editWindow && <div id={item._id} className="w-full md:w-1/2 flex  p-2 border border-gray-200">
                    <div className="rounded">
                        <img src={item.photo[0]} className='w-[150px] md:w-[200px] ' alt="" />
                    </div>
                    <div className="ml-2 md:text-lg text-sm flex flex-col md:justify-start">
                       <Link href={`/item/${item.url}`}><h2 className="font-semibold cursor-pointer hover:text-blue-500">{newData.title}</h2></Link>
                        <h3 className="">{newData.location}</h3>
                        <h4 className=" ">Rs {newData.rent}</h4>
                    </div>
                    <div className="ml-8 text-sm flex flex-col ">
                        <div className="flex items-center">
                            <input type="checkbox" onChange={()=>{handleOnStatusUpdate(item._id, true)}} checked={available?true:false} className="cursor-pointer" /><button className='ml-1'>Available</button>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" onChange={()=>{handleOnStatusUpdate(item._id, false)}} checked={available?false:true} className="cursor-pointer" /><button className='ml-1'>Unavailable</button>
                        </div>
                        <div className="flex items-center w-full justify-start hover:text-blue-500">
                            <AiOutlineDelete className='-ml-[1px]' />
                            <button className='ml-1' onClick={()=>{handleOnDelete(item._id)}} >{deleteItem}</button>
                        </div>
                        <div onClick={triggerEditWindow} className="flex items-center w-full justify-start hover:text-blue-500">
                            <AiOutlineEdit className='-ml-[1px]' />
                            <button className='ml-1' >Edit</button>
                        </div>
                    </div>
                </div>
            }
            { 
             editWindow && <div className="w-full rounded border border-gray-200 p-2 flex-col">
                    <div className="w-full flex justify-center p-4">
                <form onSubmit={handleOnEdit} className='w-full'>
                    <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="title">Title <span className=' text-red-400'>*</span> </label>
                        <input value={itemData.title} name='title' onChange={handleOnChange} placeholder='1 BHK Flat' id='title-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div>
                    {/* <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="title">Url</label>
                        <input name='url' onChange={handleOnChange} placeholder='url' value={item.url} id='url-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div> */}
                    <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="location">Location <span className=' text-red-400'>*</span> </label>
                        <input name='location' value={itemData.location} onChange={handleOnChange} placeholder='Pahlewan Chauk Batla House, Okhla New Delhi 110025' id='location-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div>
                    <div className="w-full flex flex-col items-start  my-1">
                        <label htmlFor="nearby-place">Nearby Place <span className=' text-red-400'>*</span> </label>
                        <input name='nearbyplace' value={itemData.nearbyplace} onChange={handleOnChange} placeholder='Al Noot Masjid, Farhan Juice Corner' id='nearby-place-input' type="text" className='w-full pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="flex flex-col items-start my-1">
                            <label htmlFor="">Rent (INR)<span className=' text-red-400'>*</span> </label>
                            <input value={itemData.rent} name='rent' onChange={handleOnChange} placeholder='5000' id='rent-input' type="number" className='w-[90px] pl-1 border border-gray-400 rounded focus:outline-blue-400 focus:outline ' />
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
                        <div className="flex flex-col items-start my-1">
                            <label htmlFor="">Water Included<span className=' text-red-400'>*</span> </label>
                            <select onChange={handleOnChange} name="waterincluded" className='border border-gray-400 w-full' id="">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
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
                    <div className="flex">
                           {
                                newData.photo.length>0 && newData.photo.map((item,index)=>{
                                    return <div key={index} className="rounded border mr-1 border-gray-100 p-1 mt-2"><img src={item} className="w-[150px]" alt="" /></div>
                                })
                            }
                           </div>
                    </div>
                    <div className="w-full flex items-start  my-1">
                        {
                            !editting && <input type="submit" value="Edit" className='py-1 px-2 bg-blue-400 text-white cursor-pointer mt-1 hover:bg-blue-500' />
                        }
                        {
                            !editting && <input type="button" onClick={triggerEditWindow} value="Cancel" className='py-1 px-2   text-blue-400 cursor-pointer mt-1' />
                        }
                        {
                            editting && <Spinner/>
                        }
                    </div>
                </form>
            </div>
                </div>
            }
        </>
    )
}

export default AdminItem