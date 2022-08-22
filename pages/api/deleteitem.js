import connectToDb from "../../middlewares/connectToDb";
import Item from '../../models/Item'
import jwt from 'jsonwebtoken'
const JWTSECRET = "HELLO"
connectToDb();
const deleteItem = async (req, res)=>{
    if(req.method!=='POST'){
        return res.json({success:false, msg:"Method not allowed"})
    }
    let {authtoken, id} = JSON.parse(req.body);
    id = id.trim()
    if(!authtoken){
        return res.json({success:false, msg:"No authtoken provided"})
    }
    if(!id){
        return res.json({success:false, msg:"Item id not provided"})
    }
    let user = jwt.verify(authtoken, JWTSECRET)
    console.log(user)
    let item = await Item.findOne({_id:id})
    console.log(item)
    if(item.user!=user.id){
        return res.json({success:false, msg:"You are not authorized to delete this item"})
    }
    item.delete().then((response)=>{
        return res.json({success:true, msg:"Item deleted successgully"})
    })
}

export default deleteItem;