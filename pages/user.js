import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { MdOutlineEdit, MdOutlineSave, MdOutlineFileUpload } from 'react-icons/md'
import Items from '../components/Items'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'
import MobileNavbar from '../components/MobileNavbar'
import AdminItem from '../components/AdminItem'
const User = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [editWindowOpen, setEditWindowOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({ name: '', photo: '', email: '', authtoken: '', password:'' });
    const [items, setItems] = useState([])
    const [msg, setMsg] = useState('')
    const router = useRouter();
    const fetchUser = async () => {
        if (typeof window !== 'undefined') {
            let response = await fetch('/api/fetchuser', {
                method: 'POST',
                body: JSON.stringify({ authtoken: localStorage.getItem('ms-authtoken') })
            })
            let data = await response.json()
            setUser({ ...user, name: data.user.name, photo: data.user.photo, email: data.user.email, password:data.user.password,  authtoken: localStorage.getItem('ms-authtoken') })
        }
    }
    const fetchItems = async ()=>{
        if(typeof window!=='undefined'){
            const response = await fetch("/api/getuseritem", {
                method:"POST",
                body:JSON.stringify({authtoken:localStorage.getItem('ms-authtoken')})
            })
            const data = await response.json();
            if(data.success){
                setItems(data.item)
            }else{
                setMsg(data.msg)
            }
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined'){
            if(localStorage.getItem('ms-authtoken')){
                setLoggedIn(true);
                fetchUser();
                fetchItems();
            }else{
                router.push('/')
            }
        }
    }, [])
    const openCloseEditWindow = () => {
        if (editWindowOpen) {
            setEditWindowOpen(false)
        } else {
            setEditWindowOpen(true)
        }
    }
    const uploadImageTrigger = async () => {
        if (typeof window !== 'undefined') {
            let photoInput = document.getElementById('user-photo-input');
            photoInput.click();
        }
    }
    const uploadImage = async () => {
        let photoInput = document.getElementById('user-photo-input');
        const files = photoInput.files;
        try {
            let data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'myspaceprofile');
            const response = await fetch('http://api.cloudinary.com/v1_1/mohdusman1/image/upload', {
                method: 'POST',
                body: data
            })
            const file = await response.json();
            setUser({ ...user, photo: file.url })
        } catch (error) {
            alert(error.msg)
        }
    }
    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleOnSave = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/edituser', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('ms-name', data.user.name);
            localStorage.setItem('ms-photo', data.user.photo);
            localStorage.setItem('ms-authtoken', data.user.authtoken)
            toast.success("Update Success")
            openCloseEditWindow()
        }else{
            toast.error(data.msg)
        }
    }
    const showHidePassword = ()=>{
        if(typeof window!=='undefined'){
            let elem =document.getElementById('password-input');
            if(elem.type == 'password'){
                elem.type = 'text'
                setShowPassword(true)
            }else{
                elem.type = 'password'
                setShowPassword(false)
            }
        }
    }
   
    return (
        <>
            <Navbar />
            <ToastContainer position='top-right'/>
            <div className="w-full rounded flex flex-col items-center md:p-2 p-1 ">
                <div className="w-full flex flex-col items-center mt-3 border border-gray-300 rounded relative">
                    {
                        loggedIn && <>
                            {
                                !editWindowOpen && user.name && <>
                                    <button onClick={openCloseEditWindow} className='absolute top-1 right-1 flex items-center z-10 bg-blue-400 p-1 rounded-sm text-sm text-white'>Edit <MdOutlineEdit className='text-lg' /> </button>
                                    <img src={user.photo} className="w-[60px] h-[60px] mt-2 rounded-full" alt="" />
                                    <h2 className="text-lg font-semibold mt-2">{user.name}</h2>
                                    <h4>{user.email}</h4>
                                </>
                            }
                            {
                                !editWindowOpen && !user.name && <>
                                <button   className='absolute  skelton w-[60px] h-[20px] top-1 right-1 flex items-center z-10 bg-gradient-to-r from-gray-300 to-gray-100 p-1 rounded-sm text-sm '> </button>
                                <div  className="w-[60px] skelton  bg-gradient-to-r from-gray-300 to-gray-100 h-[60px] mt-2 rounded-full" alt="" />
                                <div className=" mt-2 skelton w-[200px] h-[20px] bg-gradient-to-r from-gray-300 to-gray-100"></div>
                                <div className='w-[300px] skelton h-[20px] my-2 bg-gray-200'></div>
                            </>
                            }
                            {
                                editWindowOpen && <>
                                    <form onSubmit={handleOnSave} className="gm w-full gm flex flex-col items-center">
                                        <div className="m-auto relative flex flex-col items-center justify-center">
                                            <img src={user.photo} onClick={uploadImageTrigger} className="w-[60px] h-[60px] mt-2 rounded-full cursor-pointer opacity-60 hover:opacity-75" alt="" />
                                            <MdOutlineFileUpload onClick={uploadImageTrigger} className=' cursor-pointer absolute text-2xl mt-2' />
                                        </div>
                                        <div className=" flex md:w-[250px] w-full m-auto items-center border border-gray-300 px-1 rounded my-1 mt-3">
                                            <input onChange={uploadImage} type="file" name="photo" id="user-photo-input" hidden />
                                            <img src="https://img.icons8.com/glyph-neue/64/000000/name.png" className='w-[20px]' alt="" />
                                            <input onChange={handleOnChange} type="text" name='name' value={user.name} className='bg-transparent px-1 border-none w-full rounded focus:outline-none my-1' />
                                        </div>
                                        <div className=" md:w-[250px] w-full flex m-auto items-center border border-gray-300 px-1 rounded my-1">
                                            <img src="https://img.icons8.com/material-outlined/24/000000/new-post.png" className='w-[20px]' alt="" />
                                            <input onChange={handleOnChange} type="email" name='email' value={user.email} className='bg-transparent px-1 border-none w-full rounded focus:outline-none my-1' />
                                        </div>
                                        <div className=" md:w-[250px] w-full flex m-auto items-center border border-gray-300 px-1 rounded my-1">
                                            <img src="https://img.icons8.com/ios-glyphs/30/000000/password--v1.png" className='w-[20px]' alt="" />
                                            <input onChange={handleOnChange} type="password" id='password-input' name='password' value={user.password} className='bg-transparent px-1 border-none w-full rounded focus:outline-none my-1' />
                                            <button type='button' >
                                                {
                                                    !showPassword && <AiOutlineEye className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword} />
                                                }
                                                {
                                                    showPassword && <AiOutlineEyeInvisible className='text-xl mx-1 cursor-pointer  ' onClick={showHidePassword} />
                                                }
                                            </button>

                                        </div>
                                        <button className='absolute top-1 right-1 flex items-center z-10 bg-blue-400 p-1 rounded-sm text-sm text-white'>Save <MdOutlineSave className='text-lg' /> </button>

                                    </form>
                                </>
                            }
                        </>
                    }

                </div>
                {
                    loggedIn && <>
                    <div className="w-full mt-2 flex flex-wrap">
                    {
                        items && items.map((item, index)=>{
                            return <AdminItem key={index} item={item} />
                        })
                    }
                    {
                        !items && <>
                        <h2 className='text-center font-semibold'>{msg}</h2>
                        <Link href={"/add"}><h3 className='text-center text-sm text-blue-500 cursor-pointer hover:text-blue-600 font-semibold'>List your first item</h3></Link>
                        </>
                    }
                </div>
                    </>
                }
            </div>
            <MobileNavbar/>
        </>
    )
}

export default User