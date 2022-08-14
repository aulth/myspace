import React from 'react'
import Itemcard from './Itemcard'

const Items = ({allItems, msg}) => {
  
  return (
    <div className="w-full flex flex-wrap  justify-center box-border p-2">
      {
        allItems && allItems.map((item, index)=>{
          return <Itemcard key={index} data={item} />
        })
      }
      
    </div>
  )
}

export default Items