import React from 'react'

const Search = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center p-2">
        <div className="w-full gm flex items-center pl-1 rounded" id='search-box'>
          <img src="https://img.icons8.com/ios/50/000000/search--v1.png" className='w-[20px]' alt="" />
          <input type="search" placeholder='Search here..' className='w-full bg-transparent h-full focus:outline-none border-0 p-2 ml-1' name='search' id='search-input' />
          <div className="flex p-1   h-full   items-center justify-center">
            <button className="text-center px-2  hover:text-cyan-300 focus:text-cyan-400">Filter</button>
            <button className="text-center pl-2 hover:text-cyan-300 focus:text-cyan-400">Sort</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search