import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { MdOutlineEdit, MdOutlineSave, MdOutlineFileUpload } from 'react-icons/md'
import Items from '../components/Items'
const User = ({ allItems, msg }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [editWindowOpen, setEditWindowOpen] = useState(false)
    const [user, setUser] = useState({ name: '', photo: '' , email:'', authtoken:''})
    const fetchUser = async () => {
        if (typeof window !== 'undefined') {
            let response = await fetch('/api/fetchuser', {
                method: 'POST',
                body: JSON.stringify({ authtoken: localStorage.getItem('ms-authtoken') })
            })
            let data = await response.json()
            setUser({...user, name:data.user.name, photo:data.user.photo, email:data.user.email, authtoken:localStorage.getItem('ms-authtoken')})
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('ms-authtoken')) {
            setLoggedIn(true)
            fetchUser()
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
    const handleOnEditName = (e) => {
        setUser({ ...user, name: e.target.value })
    }
    const handleOnSave = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/edituser', {
            method:'POST',
            body:JSON.stringify(user)
        })
        const data = await response.json();
        if(data.success){
            localStorage.setItem('ms-name', data.user.name);
            localStorage.setItem('ms-photo', data.user.photo)
            openCloseEditWindow()
        }
    }
    return (
        <>
            <Navbar />
            <div className="w-full rounded flex flex-col items-center md:p-2 p-1 ">
                <div className="w-full flex flex-col items-center mt-3 border border-gray-300 rounded relative">
                    {
                        loggedIn && <>
                            {
                                !editWindowOpen && user.name && <>
                                    <button onClick={openCloseEditWindow} className='absolute top-1 right-1 flex items-center z-10 bg-cyan-400 p-1 rounded-sm text-sm text-white'>Edit <MdOutlineEdit className='text-lg' /> </button>
                                    <img src={user.photo} className="w-[60px] h-[60px] mt-2 rounded-full" alt="" />
                                    <h2 className="text-lg font-semibold mt-2">{user.name}</h2>
                                    <h4>{user.email}</h4>
                                </>
                            }
                            {
                                editWindowOpen && <>
                                    <form onSubmit={handleOnSave} className="gm w-full gm flex flex-col items-center">
                                        <div className="m-auto relative flex flex-col items-center justify-center">
                                            <img src={user.photo} onClick={uploadImageTrigger} className="w-[60px] h-[60px] mt-2 rounded-full cursor-pointer opacity-60 hover:opacity-75" alt="" />
                                            <MdOutlineFileUpload onClick={uploadImageTrigger} className=' cursor-pointer absolute text-2xl mt-2' />
                                        </div>
                                        <div className=" flex m-auto items-center border border-gray-300 px-1 rounded my-3">
                                            <input onChange={uploadImage} type="file" name="photo" id="user-photo-input" hidden />
                                            <img src="https://img.icons8.com/glyph-neue/64/000000/name.png" className='w-[20px]' alt="" />
                                            <input onChange={handleOnEditName} type="text" name='name' value={user.name} className='bg-transparent px-1 border-none w-[250px] rounded focus:outline-none my-1' />
                                        </div>
                                    <button className='absolute top-1 right-1 flex items-center z-10 bg-cyan-400 p-1 rounded-sm text-sm text-white'>Save <MdOutlineSave className='text-lg' /> </button>

                                    </form>
                                </>
                            }
                        </>
                    }

                </div>
                <div className="w-full rounded border border-gray-300 mt-2">
                    {/* <Items allItems={allItems} msg={msg} /> */}

                </div>
            </div>
        </>
    )
}

export default User
export async function getServerSideProps(context) {
    const response = await fetch('https://myspacebook.vercel.app/api/getallitem');
    const data = await response.json();
    if (data.success) {
        return {
            props: { allItems: data.item, msg: 'Data Available' }
        }
    }
    return {
        props: { allItems: {}, msg: data.msg }
    }
}