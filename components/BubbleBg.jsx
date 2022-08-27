import React from 'react'

const BubbleBg = () => {
    return (
        <>
            <div className="rounded-full absolute top-[0%] left-[0%] bg-pink-400 w-[400px] h-[400px] opacity-10"></div>
            <div className="rounded-full absolute top-[10%] left-[80%] bg-yellow-200 w-[400px] h-[400px] opacity-10"></div>
            <div className="rounded-full absolute md:top-[30%] bottom-[10%] left-[30%] bg-blue-400 w-[400px] h-[400px] opacity-10"></div>
            <div className="rounded-full absolute bottom-[50%] left-[60%] bg-green-400 w-[400px] h-[400px] opacity-10"></div>
            <div className="rounded-full absolute bottom-[40%] left-[10%] bg-gray-400 w-[400px] h-[400px] opacity-10"></div>
            <div className="w-full h-screen absolute top-0 gm"></div>
        </>
    )
}

export default BubbleBg