import React, {useState} from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import {useRouter} from 'next/router'
const AdminItem = ({ item }) => {
    const router = useRouter()
    const [available, setAvailable] = useState(item.available?true:false)
    const [deleteItem, setDeleteItem] = useState('Delete')
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
    return (
        <>
            <ToastContainer position='top-right'/>

            {
                item && <div id={item._id} className="w-full md:w-1/2 flex  p-2 border border-gray-200">
                    <div className="rounded">
                        <img src={item.photo[0]} className='w-[150px] md:w-[200px] ' alt="" />
                    </div>
                    <div className="ml-2 md:text-lg text-sm flex flex-col md:justify-start">
                       <Link href={`/item/${item.url}`}><h2 className="font-semibold cursor-pointer hover:text-blue-500">{item.title}</h2></Link>
                        <h3 className="">{item.location}</h3>
                        <h4 className=" ">Rs {item.rent}</h4>
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
                        <div className="flex items-center w-full justify-start hover:text-blue-500">
                            <AiOutlineEdit className='-ml-[1px]' />
                            <button className='ml-1'>Edit</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AdminItem