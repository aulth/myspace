import React from 'react'

const Search = () => {
  return (
    <div className="w-full flex justify-center items-center p-2">
        <div className="w-full flex items-center border border-gray-500 px-1 rounded-tl-xl rounded-br-xl" id='search-box'>
            <img src="https://img.icons8.com/ios/50/000000/search--v1.png" className='w-[20px]' alt="" />
            <input  type="search" placeholder='Search here..' className='w-full focus:outline-none border-0 pl-2' name='search' id='search-input' />
            <div className="flex items-center justify-center">
                <button className="text-center p-2 hover:text-blue-300 focus:text-blue-400">Filter</button>
                <button className="text-center p-2 hover:text-blue-300 focus:text-blue-400">Sort</button>
            </div>
        </div>
    </div>
  )
}

export default Search