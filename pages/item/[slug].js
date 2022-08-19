import React from 'react'
import mongoose from 'mongoose'
import Item from '../../models/Item'
import Itempage from '../../components/Itempage'
const getSingleItem = ({success, item, msg}) => {
  return (
    <>
    {
      success && <>
      <Itempage item={item}/>
      </>
    }
    {
      !success && <>
        This Page is not available
      </>
    }
    </>
  )
}
export async function getServerSideProps(context){
    const {slug} = context.query;
    const mongodburl="mongodb+srv://usman:admin@cluster0.ikgks.mongodb.net/Panda?retryWrites=true&w=majority"
    const db = await mongoose.connect(mongodburl);
    if(db.connections[0].readyState){
      let item = await Item.findOne({url:slug})
      if(item){
        return {
          props:{
            success:true,
            item:JSON.parse(JSON.stringify(item)),
            msg:'Data fetched'
          }
        }
      }
      return {
        props:{
          success:false,
          item:{},
          msg:'This page not available'
        }
      }
    }
    return {
        props:{
          success:false,
          item:{},
          msg:"Database not connected"
        }
    }
}
export default getSingleItem